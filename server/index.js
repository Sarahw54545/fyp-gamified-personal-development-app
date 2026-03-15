import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helloRouter from "./api/hello/index.js";
import goalsRouter from "./api/goals/index.js"
import authRouter from "./api/auth/index.js"
import {pool} from "./db.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

pool.query("SELECT NOW()")
.then(() => console.log("PostgreSQL Connected"))
.catch(err => console.error("PostgreSQL connection error", err));

app.use("/api", helloRouter);
app.use("/api/goals", goalsRouter);
app.use("/api/auth", authRouter)

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.info(`Server running on port ${PORT}`);
});