import { Router } from "express";
import { checkGoogleStatus } from "../controllers/googleStatus.controller.js";

const router = Router();

// GET /api/google/status/:teacherId
router.get("/:teacherId", checkGoogleStatus);

export default router;
