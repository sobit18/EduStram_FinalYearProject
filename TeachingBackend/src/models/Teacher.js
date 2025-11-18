import mongoose, { Schema } from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true,
    },
    faculty: { type: String, required: true },
    course: { type: String, required: true },
    phone: { type: String, required: true, unique: true },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
    courses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
    schedules: [{ type: mongoose.Schema.Types.ObjectId, ref: "Schedule" }],

    googleId: { type: String }, // Google account ID
    tokens: {
      accessToken: { type: String },
      // refreshToken: { type: String },
    },
  },

  { timestamps: true }
);

const Teacher = mongoose.model("TeacherProfile", teacherSchema);
export default Teacher;
