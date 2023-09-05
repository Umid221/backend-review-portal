import { Prisma, PrismaClient, User } from "@prisma/client";
import { DefaultArgs } from "@prisma/client/runtime/library";
import { signJwt } from "utils/jwt";

const prisma = new PrismaClient();

export const createUser = async (data: Prisma.UserCreateInput) => {
    await prisma.user.create({ data });
};

export const getUser = async (
    where: Prisma.UserWhereUniqueInput,
    select?: Prisma.UserSelect<DefaultArgs>,
) => {
    return (await prisma.user.findUnique({ where, select })) as User;
};

export const signTokens = (user: User) => {
    const accessToken = signJwt(user, "accessTokenPrivateKey", {
        expiresIn: "1d",
    });
    const refreshToken = signJwt(user, "refreshTokenPrivateKey", {
        expiresIn: "1d",
    });

    return { accessToken, refreshToken };
};
