import express from "express";
import {pool} from "../../db.js";

const router = express.Router();

router.get("/hello", async (req, res) => {
    const result = await pool.query("SELECT message FROM hello LIMIT 1");
    res.status(200).json({message: result.rows[0].message});
});

export default router;