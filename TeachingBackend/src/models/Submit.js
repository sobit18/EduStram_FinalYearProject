import mongoose, { Schema } from "mongoose";

const SubmitSchema = new Schema(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "TeacherProfile",
      required: true,
    },
    studentId: {
      type: Schema.Types.ObjectId,
      ref: "StudentProfile",
      required: true,
    },
    assignmentId: {
      type: Schema.Types.ObjectId,
      ref: "Assignment",
      required: true,
    },
    answer: {
      type: String, // text answer
      trim: true,
    },
    fileUrl: {
      type: String, // optional: store file path or URL
    },
    status: {
      type: String,
      enum: ["submitted", "graded", "pending"],
      default: "submitted",
    },
    grade: {
      type: String, // e.g. "A", "95"
    },
    feedback: {
      type: String,
      trim: true,
    },
  },
  { timestamps: true } // ✅ automatically adds createdAt & updatedAt
);

const Submit = mongoose.model("Submit", SubmitSchema);
export default Submit;
