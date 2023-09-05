import { createTagHandler, getTagsHandler } from "@controllers/tag.controllers";
import express from "express";

const router = express.Router();

router.post("", createTagHandler);
router.get("", getTagsHandler);

export default router;
