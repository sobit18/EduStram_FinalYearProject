import User from "../models/User.js";
import StudentProfile from "../models/Student.js";
import TeacherProfile from "../models/Teacher.js";
import ApiError from "../utils/apiError.utils.js";
import emailconfig from "../config/email.config.js";
import crypto from "crypto";
import { Types } from "mongoose";

export const register = async ({
  fullName,
  email,
  level,
  phone,
  faculty,
  password,
  role,
  course,
  adminId,
}) => {
  try {
    const existing = await User.findOne({ email });
    if (!email) throw new ApiError(400, "Email is required field");
    // if (!role) throw new ApiError(400, "role is required field")
    console.log("role is", role);
    if (!["student", "teacher"].includes(role)) {
      throw new ApiError(400, "invalid role");
    }
    if (existing) throw new ApiError(400, "Email already exists");

    let user;
    if (role === "student") {
      user = await User.create({ fullName, email, password, role });
      const student = await StudentProfile.create({
        userId: user?._id,
        faculty,
        level,
      });
    } else if (role === "teacher") {
      password = crypto.randomBytes(4).toString("hex") || "123"; //auto generated password;
      console.log("password is: ", password);
      user = await User.create({ fullName, email, password, role });
      const teacher = await TeacherProfile.create({
        userId: user?._id,
        faculty,
        course,
        adminId,
        phone,
      });
      console.log("Teacher profile: ", teacher);

      // call this function to send email
      await emailconfig.sendEmail({
        to: email,
        subject: "Your New Password",
        template: "Password", // file Password.hbs or Password.html depending on your setup
        data: {
          email,
          password: password,
          recipientName: "Safal",
        },
      });

      console.log("Email send succesfully");
    }

    console.log("password is: ", password);
    return;
  } catch (error) {
    throw error;
  }
};

export const login = async ({ email, password }) => {
  const user = await User.findOne({ email });

  if (!user || !(await user.comparePassword(password))) {
    throw new ApiError(400, "Invalid credentials");
  }
  const token = await user?.generateAuthToken();
  const refreshToken = await user?.generateRefreshToken();
  return { authToken: token, refreshToken, role: user?.role };
};

export const getUserById = async (userId) => {
  // return await User.findById(userId).select("-password")
  let profile = await TeacherProfile.findOne({ userId: new Types.ObjectId(userId) })
    .populate("userId", "fullName email role") // only return selected fields
    .populate("courses");

      if (!profile) {
    profile = await StudentProfile.findOne({ userId: new Types.ObjectId(userId) })
      .populate("userId", "fullName email role")
      // .populate("enrolledCourses"); // assuming students have enrolledCourses field
  }

  return profile;
};

export const generateResetToken = async (email) => {
  const user = await User.findOne({ email });
  if (!user) throw new ApiError(400, "User not found");
  return user.generateResetToken();
};
