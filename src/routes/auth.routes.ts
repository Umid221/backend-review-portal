import {
    loginHandler,
    registerUserHandler,
} from "../controllers/auth.controller";
import express from "express";

const router = express.Router();

router.post("/register", registerUserHandler);
router.post("/login", loginHandler);

export default router;
