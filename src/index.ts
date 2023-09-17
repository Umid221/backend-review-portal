require("dotenv").config();
import config from "config";
import express from "express";
import cors from "cors";
import authRouter from "./routes/auth.routes";
import tagRouter from "./routes/tag.routes";
import { verifyJwt } from "./utils/jwt";

const app = express();
app.use(express.json());
app.use(
    cors({
        origin: "https://frontend-review-portal.vercel.app",
    }),
);

app.use("/api/auth", authRouter);
// app.use(verifyJwt)
app.use("/api/tags", tagRouter);

app.listen(config.get("port"), () => {
    console.log(`Server Running on port ${config.get("port")}`);
});
