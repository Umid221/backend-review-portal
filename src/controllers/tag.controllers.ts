import { Request, Response } from "express";
import { createTag, getTags } from "@services/tag.service";

export const createTagHandler = async (req: Request, res: Response) => {
    try {
        if (!req.body.name) {
            return res.status(400).json({ message: "tagNameEmpty" });
        }

        await createTag(req.body);
        res.status(201).json({ message: "tagCreated" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

export const getTagsHandler = async (req: Request, res: Response) => {
    try {
        const tags = await getTags();
        res.status(200).json({ data: tags });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
