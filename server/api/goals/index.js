import express from "express";
import GamificationEngine from "../../gamification/index.js";
import achievements from "../../gamification/achievements.js";
import { pool } from "../../db.js";

const router = express.Router();

// GET all goals
router.get("/", async (req, res) => {
  try {
    const userId = req.user.id

    const result = await pool.query(
      "SELECT * FROM goal WHERE user_id = $1 ORDER BY created_at DESC",
      [userId]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

// Create a Goal
router.post("/", async (req, res) => {
  try {
    const { title, description, due_date } = req.body;
    const userId = req.user.id

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const newGoal = await pool.query(
      `
      INSERT INTO goal (title, description, due_date, user_id)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [
        title,
        description || null,
        due_date || null,
        userId
      ]
    );

    res.status(201).json(newGoal.rows[0]);

  } catch (err) {
    console.error("Error creating goal:", err.message);
    res.status(500).json({ error: "Server error while creating goal" });
  }
});

// DELETE a goal
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      DELETE FROM goal
      WHERE id = $1
      RETURNING *
      `,
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.json({ message: "Goal deleted", goal: result.rows[0] });

  } catch (err) {
    console.error("Error deleting goal:", err.message);
    res.status(500).json({ error: "Server error while deleting goal" });
  }
});

// Update a goal
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, due_date } = req.body;

    // Validation
    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const updatedGoal = await pool.query(
      `
      UPDATE goal
      SET title = $1,
          description = $2,
          due_date = $3
      WHERE id = $4 AND is_active = TRUE
      RETURNING *
      `,
      [title, description || null, due_date || null, id]
    );

    if (updatedGoal.rows.length === 0) {
      return res.status(404).json({ error: "Goal not found" });
    }

    res.json(updatedGoal.rows[0]);

  } catch (err) {
    console.error("Error updating goal:", err.message);
    res.status(500).json({ error: "Server error while updating goal" });
  }
});

// Archive a goal
router.put("/:id/archive", async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const result = await pool.query(
      `
      UPDATE goal
      SET is_active = FALSE
      WHERE id = $1
        AND user_id = $2
        AND completed = TRUE
      RETURNING *
      `,
      [id, userId]
    );

    if (result.rowCount === 0) {
      return res.status(400).json({
        error: "Goal not found or not completed"
      });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error("Archive goal error:", err);
    res.status(500).json({ error: "Failed to archive goal" });
  }
});

// Complete a goal + trigger gamification
router.post("/:id/complete", async (req, res) => {

  const { id } = req.params;
  const userId = req.user.id;

  const now = new Date();
  const today = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  );

  const client = await pool.connect();

  try {
    // Start of Transaction
    await client.query("BEGIN");

    // 1. Mark goal as completed
    const goalResult = await client.query(
      `
      UPDATE goal
      SET completed = TRUE,
      is_active = FALSE
      WHERE id = $1
      AND user_id = $2
      AND completed = FALSE
      RETURNING *
      `,
      [id, userId]
    );

    if (goalResult.rowCount === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Goal not found or already completed" });
    }

    // 2. Increment GOAL_COMPLETED counter - On first completion insert a new row, later completions increment value by 1
    await client.query(
      `
      INSERT INTO user_counters (user_id, counter_key, value)
      VALUES ($1, 'GOAL_COMPLETED', 1)
      ON CONFLICT (user_id, counter_key)
      DO UPDATE SET value = user_counters.value + 1
      `,
      [userId]
    );

    // 3. Load gamification state
    const [userResult, countersResult, achievementsResult] = await Promise.all([
      client.query(`SELECT total_xp FROM users WHERE id = $1`, [userId]),
      client.query(`SELECT counter_key, value FROM user_counters WHERE user_id = $1`, [userId]),
      client.query(
        `
        SELECT achievement_key, completed_tiers, last_completed_date
        FROM user_achievements
        WHERE user_id = $1
        `,
        [userId]
      )
    ]);

    const userState = {
      userId,
      totalXp: userResult.rows[0].total_xp,
      counters: Object.fromEntries(
        countersResult.rows.map(c => [c.counter_key, c.value])
      ),
      achievements: Object.fromEntries(
        achievementsResult.rows.map(a => [
          a.achievement_key,
          {
            completedTiers: a.completed_tiers || [],
            lastCompletedDate: a.last_completed_date
          }
        ])
      )
    };

    // 4. Evaluate gamification
    const gamificationResult = GamificationEngine.evaluateGamification({
      userState,
      event: { type: "GOAL_COMPLETED" },
      achievements,
      today
    });

    // 5. Persist XP
    await client.query(
      `UPDATE users SET total_xp = $1 WHERE id = $2`,
      [userState.totalXp, userId]
    );

    // 6. Persist achievement state
    for (const [key, state] of Object.entries(userState.achievements)) {
      await client.query(
        `
        INSERT INTO user_achievements (user_id, achievement_key, completed_tiers, last_completed_date)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (user_id, achievement_key)
        DO UPDATE SET completed_tiers = $3, last_completed_date = $4
        `,
        [
          userId,
          key,
          state.completedTiers || [],
          state.lastCompletedDate || null
        ]
      );
    }

    await client.query("COMMIT"); // End of Successful Transaction

    res.json({
      success: true,
      goal: goalResult.rows[0],
      gamification: gamificationResult
    });

  } catch (err) {
    await client.query("ROLLBACK"); // Rollback Transaction if Error Occurs
    console.error("Goal completion error:", err);
    res.status(500).json({ error: "Failed to complete goal" });
  }
  finally {
    client.release();
  }
});

export default router;