require("dotenv").config();
import config from "config";
import { verifyJwt } from "./utils/jwt";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import tagRouter from "./routes/tag.routes";
import express from "express";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);
// app.use(verifyJwt)
app.use("/api/tag", tagRouter);

app.listen(config.get("port"), () => {
    console.log(`Server Running on port ${config.get("port")}`);
});
