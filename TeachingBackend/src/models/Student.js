import mongoose, { Schema } from "mongoose"


const studentSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
    faculty: { type: String },
    level: { type: Number, reqiuired:true,},
    gender: { type: String, enum: ["male", "female", "other"] ,default:"other"},
    dateOfBirth: { type: Date },
    address: { type: String },
    profileImage: { type: String },
    batch: { type: String },
    educationLevel: { type: String },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  { timestamps: true }
);

const Student = mongoose.model("StudentProfile", studentSchema);
export default Student;
