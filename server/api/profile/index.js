import express from "express";
import { pool } from "../../db.js";
import GamificationEngine from "../../gamification/index.js";
import achievements from "../../gamification/achievements.js";

const router = express.Router();

// GET user profile data
router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    // 1. Load user base data
    const userResult = await pool.query(
      `SELECT id, email, total_xp FROM users WHERE id = $1`,
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userResult.rows[0];

    // 2. Load counters
    const countersResult = await pool.query(
      `SELECT counter_key, value FROM user_counters WHERE user_id = $1`,
      [userId]
    );

    const counters = Object.fromEntries(
      countersResult.rows.map(row => [row.counter_key, row.value])
    );

    // 3. Load achievement state
    const achievementsResult = await pool.query(
      `
      SELECT achievement_key, completed_tiers, last_completed_date
      FROM user_achievements
      WHERE user_id = $1
      `,
      [userId]
    );

    const achievementState = Object.fromEntries(
      achievementsResult.rows.map(row => [
        row.achievement_key,
        {
          completedTiers: row.completed_tiers || [],
          lastCompletedDate: row.last_completed_date
        }
      ])
    );

    // 4. Derive level from total XP
    const level = GamificationEngine.calculateLevel(user.total_xp);
    const nextLevelXp = GamificationEngine.xpForNextLevel(level);

    // 5. Merge static achievement definitions with user progress
    const achievementsWithProgress = achievements.map(def => {
      const state = achievementState[def.key] || {};

      if (def.type === "progressive") {
        const completedTiers = state.completedTiers || [];
        const highestCompleted =
          completedTiers.length > 0 ? Math.max(...completedTiers) : 0;

        const nextTier = def.tiers.find(
          tier => !completedTiers.includes(tier.threshold)
        );

        return {
          key: def.key,
          title: def.title,
          description: def.description,
          category: def.category,
          type: def.type,

          tiers: def.tiers.map(t => ({
            threshold: t.threshold,
            label: t.label
          })),

          completedTiers,
          currentValue: counters[def.criteria.event] || 0,
          nextThreshold: nextTier ? nextTier.threshold : null,
          isComplete: !nextTier
        };
      }

      if (def.type === "daily") {
        return {
          key: def.key,
          title: def.title,
          description: def.description,
          category: def.category,
          type: def.type,
          completedToday: !!state.lastCompletedDate
        };
      }

      return def;
    });

    // 6. Respond with aggregated profile data
    res.json({
      user: {
        id: user.id,
        email: user.email
      },
      gamification: {
        totalXp: user.total_xp,
        level,
        nextLevelXp,
        achievements: achievementsWithProgress
      }
    });

  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

export default router;