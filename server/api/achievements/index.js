import express from "express";
import { pool } from "../../db.js";
import achievements from "../../gamification/achievements.js";

const router = express.Router();

router.get("/", async (req, res) => {
  const userId = req.user.id;

  try {
    // Load counters
    const countersResult = await pool.query(
      `SELECT counter_key, value FROM user_counters WHERE user_id = $1`,
      [userId]
    );

    const counters = Object.fromEntries(
      countersResult.rows.map(row => [row.counter_key, row.value])
    );

    // Load achievement state
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

    // Merge definitions with user progress
    const achievementsWithProgress = achievements.map(def => {
      const state = achievementState[def.key] || {};

      if (def.type === "progressive") {
        const completedTiers = state.completedTiers || [];

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

    res.json({
      achievements: achievementsWithProgress
    });

  } catch (err) {
    console.error("Achievements fetch error:", err);
    res.status(500).json({ error: "Failed to load achievements" });
  }
});

export default router;