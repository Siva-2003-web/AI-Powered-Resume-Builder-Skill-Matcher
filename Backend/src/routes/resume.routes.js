import { Router } from "express";
import {
  start,
  createResume,
  getALLResume,
  getResume,
  updateResume,
  removeResume,
  getDemoResumes,
} from "../controller/resume.controller.js";
import { isUserAvailable } from "../middleware/auth.js";

const router = Router();

router.get("/", start);
router.get("/getDemoResumes", getDemoResumes); // Public route - no auth required
router.post("/createResume", isUserAvailable, createResume);
router.get("/getAllResume", isUserAvailable, getALLResume);
router.get("/getResume", isUserAvailable, getResume);
router.put("/updateResume", isUserAvailable, updateResume);
router.delete("/removeResume", isUserAvailable, removeResume);

export default router;
