import express from "express";
import { pool } from "../../db.js";
import GamificationEngine from "../../gamification/index.js";
import achievements from "../../gamification/achievements.js";

const router = express.Router();

// GET user profile page data
router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {

    const [userRes, goalsRes, countersRes, achievementsRes] = await Promise.all([
      pool.query(
        `SELECT id, email, total_xp FROM users WHERE id = $1`,
        [userId]
      ),
      pool.query(
        `SELECT completed FROM goal WHERE user_id = $1`,
        [userId]
      ),
      pool.query(
        `SELECT counter_key, value FROM user_counters WHERE user_id = $1`,
        [userId]
      ),
      pool.query(
        `
        SELECT completed_tiers, last_completed_date
        FROM user_achievements
        WHERE user_id = $1
        `,
        [userId]
      )
    ]);

    if (userRes.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    const user = userRes.rows[0];

    /* Level Calculation */
    const level = GamificationEngine.calculateLevel(user.total_xp);
    const nextLevelXp = GamificationEngine.xpForNextLevel(level);



    /* Goals Stats */
    const totalCreated = goalsRes.rows.length;
    const totalCompleted = goalsRes.rows.filter(g => g.completed).length;
    const completionRate =
      totalCreated > 0 ? totalCompleted / totalCreated : 0;



    /* Calculate Achievement Stats */
    const achievementStates = achievementsRes.rows;

    const progressiveDefs = achievements.filter(
      a => a.type === "progressive"
    );

    const progressiveKeys = new Set(
      progressiveDefs.map(a => a.key)
    );

    const completedProgressiveCount =
      achievementStates.filter(
        a =>
          progressiveKeys.has(a.achievement_key) &&
          (a.completed_tiers || []).length > 0
      ).length;

    const progressiveCompletionRate =
      progressiveDefs.length > 0
        ? completedProgressiveCount / progressiveDefs.length
        : 0;

    const dailyCompleted =
      achievementStates.filter(
        a => a.last_completed_date !== null
      ).length;



    /* Activity Stats */
    const counters = Object.fromEntries(
      countersRes.rows.map(row => [row.counter_key, row.value])
    );

    const longestStreak = counters.LONGEST_STREAK || 0;
    const activeDays = counters.ACTIVE_DAYS || 0;



    res.json({
      user: {
        id: user.id,
        email: user.email
      },
      gamification: {
        totalXp: user.total_xp,
        level,
        nextLevelXp
      },
      stats: {
        goals: {
          totalCreated,
          totalCompleted,
          completionRate
        },
        achievements: {
          totalCompleted: completedProgressiveCount,
          dailyCompleted,
          progressiveCompletionRate
        },
        activity: {
          longestStreak,
          activeDays
        }
      }
    });

  } catch (err) {
    console.error("Profile fetch error:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

export default router;