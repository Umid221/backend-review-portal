import { signTokens } from "./../services/user.service";
import bcrypt from "bcrypt";
import { Request, Response } from "express";
import { createUser, getUser } from "@services/user.service";
import { signJwt } from "utils/jwt";

export const registerUserHandler = async (req: Request, res: Response) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return res.status(400).json({ message: "All the fields are required" });
    }

    const hashedPassword = await bcrypt.hash(password, 8);

    try {
        await createUser({
            fullName,
            email: email.toLowerCase(),
            password: hashedPassword,
        });
        res.status(201).json({ message: "new user saved" });
    } catch (error) {
        if (error.code === "P2002") {
            return res.status(409).json({ message: "duplicate email" });
        } else {
            res.status(500).json({ message: error.message });
        }
    }
};

export const loginHandler = async (req: Request, res: Response) => {
    const { password, email } = req.body;

    try {
        const user = await getUser({ email }, { password: true });
        if (!user) {
            return res.status(401).json({ message: "Invalid email" });
        }

        const match = await bcrypt.compare(password, user.password);
        if (!match) {
            return res.status(401).json({ message: "Invalid password" });
        }

        const { accessToken, refreshToken } = signTokens(user);

        return res
            .status(200)
            .json({ message: "Login successful", accessToken, refreshToken });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
