import express, { Router } from "express";
import passport from "passport";
import User from "../models/User.js";
import Teacher from "../models/Teacher.js";

const router = Router();

// ======================
// 1️⃣ Start Google OAuth login
// ======================
router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "profile",
      "email",
      "https://www.googleapis.com/auth/calendar.events", // required for creating Meet
    ],
    accessType: "online", // no refresh token
    prompt: "consent",
  })
);

// ======================
// 2️⃣ OAuth callback
// ======================
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/login" }),
  async (req, res) => {
    try {
      const { googleId, email, tokens } = req.user;

      // Find user by email
      const user = await User.findOne({ email });
      if (!user) return res.status(404).send("User not found");

      // Update teacher profile with only accessToken
      const teacher = await Teacher.findOneAndUpdate(
        { userId: user._id },
        { 
          googleId,
          tokens: { accessToken: tokens.accessToken } // save only accessToken
        },
        { new: true, upsert: true }
      );

      if (!teacher) return res.status(404).send("Teacher profile not found");

      // Redirect to frontend dashboard
      res.redirect("http://localhost:5174/teacher");
    } catch (err) {
      console.error("Google Callback ERROR:", err);
      res.status(500).send("Error connecting Google account");
    }
  }
);

export default router;
