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

// Create a Goal
router.post("/", async (req, res) => {
  try {
    const { title, description } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ error: "Title is required" });
    }

    const newGoal = await pool.query(
      `
      INSERT INTO goal (title, description)
      VALUES ($1, $2)
      RETURNING *
      `,
      [
        title,
        description || null
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

export default router;