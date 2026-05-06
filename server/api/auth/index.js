import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../../db.js";
import { authenticateToken } from "../../middleware/authMiddleware.js";
import GamificationEngine from "../../gamification/index.js";
import achievements from "../../gamification/achievements.js";
import { isSameDay } from "../../gamification/utils.js";


const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Check if user already exists
    const existingUser = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (existingUser.rows.length > 0) {
      return res.status(400).json({
        error: "User already exists",
      });
    }

    // Hash password
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);

    // Insert user
    const newUser = await pool.query(
      `
      INSERT INTO users (email, password_hash)
      VALUES ($1, $2)
      RETURNING id, email, created_at
      `,
      [email, passwordHash]
    );

    res.status(201).json({
      message: "User registered successfully",
      user: newUser.rows[0],
    });

  } catch (err) {
    console.error("Register error:", err);
    res.status(500).json({
      error: "Server error during registration",
    });
  }
});

router.post("/login", async (req, res) => {

  try {
    const { email, password } = req.body;

    // Validate request
    if (!email || !password) {
      return res.status(400).json({
        error: "Email and password are required",
      });
    }

    // Find user
    const userResult = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );

    if (userResult.rows.length === 0) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    const user = userResult.rows[0];

    // Compare password
    const validPassword = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!validPassword) {
      return res.status(401).json({
        error: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    // --------------------------------------------------
    // LOGIN_SUCCESS Event Trigger
    // --------------------------------------------------

    // Load gamification state
    const [countersRes, achievementsRes] = await Promise.all([
      pool.query(
        `SELECT counter_key, value FROM user_counters WHERE user_id = $1`,
        [user.id]
      ),
      pool.query(
        `
    SELECT achievement_key, completed_tiers, last_completed_date
    FROM user_achievements
    WHERE user_id = $1
    `,
        [user.id]
      )
    ]);

    const userState = {
      userId: user.id,
      totalXp: user.total_xp ?? 0,
      counters: Object.fromEntries(
        countersRes.rows.map(c => [c.counter_key, c.value])
      ),
      achievements: Object.fromEntries(
        achievementsRes.rows.map(a => [
          a.achievement_key,
          {
            completedTiers: a.completed_tiers || [],
            lastCompletedDate: a.last_completed_date
          }
        ])
      )
    };


    const persistedLoginRow = achievementsRes.rows.find(
      r => r.achievement_key === "DAILY_LOGIN"
    );

    const persistedLoginDate = persistedLoginRow?.last_completed_date
      ? new Date(persistedLoginRow.last_completed_date)
      : null;

    // Trigger login-based gamification
    const gamificationResult = GamificationEngine.evaluateGamification({
      userState,
      event: { type: "LOGIN_SUCCESS" },
      achievements,
      today: new Date()
    });

    const loginUnlocked = gamificationResult.unlockedAchievements.some(a => a.key === "DAILY_LOGIN");

    const today = new Date();

    const isNewLoginDay =
      !persistedLoginDate || !isSameDay(persistedLoginDate, today);

    if (loginUnlocked && isNewLoginDay) {

      userState.counters.ACTIVE_DAYS ??= 0;
      userState.counters.CURRENT_STREAK ??= 0;
      userState.counters.LONGEST_STREAK ??= 0;

      userState.counters.ACTIVE_DAYS += 1;
      userState.counters.CURRENT_STREAK += 1;

      userState.counters.LONGEST_STREAK = Math.max(
        userState.counters.LONGEST_STREAK,
        userState.counters.CURRENT_STREAK
      );
    }



    // Persist achievement progress
    for (const [key, state] of Object.entries(userState.achievements)) {
      await pool.query(
        `
    INSERT INTO user_achievements
      (user_id, achievement_key, completed_tiers, last_completed_date)
    VALUES ($1, $2, $3, $4)
    ON CONFLICT (user_id, achievement_key)
    DO UPDATE SET
      completed_tiers = $3,
      last_completed_date = $4
    `,
        [
          user.id,
          key,
          state.completedTiers || [],
          state.lastCompletedDate || null
        ]
      );
    }

    // Persist counters
    for (const [key, value] of Object.entries(userState.counters)) {
      await pool.query(
        `
    INSERT INTO user_counters (user_id, counter_key, value)
    VALUES ($1, $2, $3)
    ON CONFLICT (user_id, counter_key)
    DO UPDATE SET value = $3
    `,
        [user.id, key, value]
      );
    }

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user.id,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({
      error: "Server error during login",
    });
  }
});

router.get("/me", authenticateToken, async (req, res) => {
  try {

    const result = await pool.query(
      "SELECT id, email FROM users WHERE id = $1",
      [req.user.id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user" });
  }
});

export default router;