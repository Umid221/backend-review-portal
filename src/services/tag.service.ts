import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createTag = async (data: Prisma.TagCreateInput) => {
    await prisma.tag.create({ data });
};

export const getTags = async () => {
    return await prisma.tag.findMany();
};
