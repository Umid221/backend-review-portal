import { createTagHandler, getTagsHandler } from "@controllers/tag.controllers";
import express from "express";

const router = express.Router();

router.get("", getTagsHandler);
router.post("", createTagHandler);

export default router;
