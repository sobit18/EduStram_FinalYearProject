import { Router } from "express";

const router = Router();
import authRouter from "./auth.routes.js"

import { isAuthenticated } from "../middleware/verifyToken.middleware.js";

import adminRoutes from "./admin.routes.js";
import teacherRoutes from './teacher.routes.js'
import studentRoutes from './student.routes.js'
import googleAuthRoutes from './googleauth.routes.js';
import googleStatusRoutes from './googleStatus.route.js';




router.use("/auth", authRouter);
router.use("/admin", adminRoutes);
router.use("/teacher", teacherRoutes);
router.use("/student", studentRoutes);
router.use("/google/auth", googleAuthRoutes);
router.use("/google/status", googleStatusRoutes); 


// protected routes
router.use(isAuthenticated);







export default router;