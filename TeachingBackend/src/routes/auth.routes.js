import { Router } from "express";
import {
  registerUser,
  loginUser,
  getProfile,
  requestResetToken,
  logout
} from "../controllers/auth.controller.js";
import { isAuthenticated } from "../middleware/verifyToken.middleware.js";

const router = Router();

router.get("/health", (req, res) => {
  return res.json({ message: "ok" });
});

router.post("/register", registerUser);
router.post("/login", loginUser);

router.use(isAuthenticated)
router.get("/getme",getProfile)
router.post("/reset-token", requestResetToken);
router.get("/me", isAuthenticated, getProfile);
router.post("/logout",logout);

export default router;
