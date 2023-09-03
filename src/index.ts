require("dotenv").config();
import config from "config";
import express, { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import cors from "cors";
import authRouter from "./routes/auth.routes";

const prisma = new PrismaClient();
const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/auth", authRouter);

app.get("auth", async (req: Request, res: Response) => {
    const users = await prisma.user.findMany();
    res.json(users);
});

app.listen(config.get("port"), () => {
    console.log(`Server Running on port ${config.get("port")}`);
});
