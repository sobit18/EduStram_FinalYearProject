import { options } from "../config/cookie.config.js";
import * as authService from "../services/auth.service.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const registerUser = asyncHandler(async (req, res) => {
  const isAdmin = req?.user?.role === "admin";
  const adminId = req?.user?._id;

  // Default role is student (self-registration)
  let role = "student";
  let payload = {
    ...req.body,
    role,
  };

  // If the current user is an admin, we are registering a teacher
  if (isAdmin) {
    role = "teacher";
    payload = {
      ...req.body,
      role,
      adminId, // track who created the teacher
    };
  }

  // Pass the finalized payload to the service
  const result = await authService.register(payload);

  res
    .status(201)
    .json(new ApiResponse(201, "User registered successfully", result));
});

export const loginUser = asyncHandler(async (req, res) => {
  const result = await authService.login(req.body);

  res.cookie("authToken", result.authToken, options);
  res.cookie("refreshToken", result.refreshToken, options);

  res.status(200).json(new ApiResponse(200, "Logged in successfully", result));
});

export const getProfile = asyncHandler(async (req, res) => {
  const user = await authService.getUserById(req.user._id);
  res
    .status(200)
    .json(new ApiResponse(200, "User profile fetched", user.toObject()));
});
export const logout = asyncHandler(async (req, res) => {
  // Clear the cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const requestResetToken = asyncHandler(async (req, res) => {
  const token = await authService.generateResetToken(req.body.email);
  res
    .status(200)
    .json(new ApiResponse(200, "Reset token generated", { token }));
});
