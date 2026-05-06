import express from "express";
import { pool } from "../../db.js";
import GamificationEngine from "../../gamification/index.js";
import achievements from "../../gamification/achievements.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const userId = req.user.id;
    const today = new Date().toISOString().slice(0, 10);

    try {
        const [userRes, goalsRes, achievementsRes] = await Promise.all([
            pool.query(`SELECT email, total_xp FROM users WHERE id = $1`, [userId]),

            pool.query(`
        SELECT id, title, completed, due_date
        FROM goal
        WHERE user_id = $1
          AND completed = FALSE
          AND is_active = TRUE
          AND (
            due_date IS NULL
            OR due_date = CURRENT_DATE
          )
        ORDER BY created_at ASC
        LIMIT 3
      `, [userId]),

            pool.query(`
        SELECT achievement_key, last_completed_date
        FROM user_achievements
        WHERE user_id = $1
      `, [userId])
        ]);


        if (userRes.rows.length === 0) {
            return res.status(404).json({ error: "User not found" });
        }

        const user = userRes.rows[0];

        const level = GamificationEngine.calculateLevel(user.total_xp);

        /** DAILY ACHIEVEMENTS */
        const dailyAchievements = achievements
            .filter(a => a.type === "daily")
            .map(def => {
                const state = achievementsRes.rows.find(
                    a => a.achievement_key === def.key
                );

                return {
                    key: def.key,
                    title: def.title,
                    xp: def.xp,
                    completedToday: !!state?.last_completed_date
                };
            });

        /** CURRENT STREAK (simple metric) */
        const currentStreakRes = await pool.query(
            `SELECT value FROM user_counters
       WHERE user_id = $1 AND counter_key = 'CURRENT_STREAK'`,
            [userId]
        );

        const currentStreak =
            currentStreakRes.rows[0]?.value || 0;

        res.json({
            user: {
                email: user.email,
                totalXp: user.total_xp,
                level
            },
            todayGoals: goalsRes.rows,
            dailyAchievements,
            streak: {
                current: currentStreak
            }
        });

    } catch (err) {
        console.error("Dashboard load error:", err);
        res.status(500).json({ error: "Failed to load dashboard" });
    }
});

export default router;