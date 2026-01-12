import { Router } from "express";
import multer from "multer";
import { extractText } from "../controller/analysis.controller.js";

const router = Router();
const upload = multer({ dest: "uploads/" });

router.post("/extract-text", upload.single("resume"), extractText);

export default router;
