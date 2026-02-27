import express from "express";
import { pool } from "../../db.js";

const router = express.Router();

// GET all goals
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM goal ORDER BY created_at DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch goals" });
  }
});

export default router;