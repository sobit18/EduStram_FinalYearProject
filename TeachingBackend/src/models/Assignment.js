import mongoose, { Schema } from "mongoose";

const AssignmentSchema = new Schema({
  teacherId: {
    type: Schema.Types.ObjectId,
    ref: "Teacher",
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: true,
  },
  subject: {
    type: String,
  },
  level: {
    type: Number,
  },
  title: {
    type: String,
    requied: true,
  },
  description: {
    type: String,
    required: true,
  },

  dueDate: {
    type: Date,
    required: true,
  },
});
const Assignment = mongoose.model("Assignment", AssignmentSchema);
export default Assignment;
