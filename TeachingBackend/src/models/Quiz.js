import mongoose, { Schema } from "mongoose";

// Sub-schema for each question
const QuestionSchema = new Schema({
  question: {           // Changed from questionText to match frontend
    type: String,
    required: true,
  },
  options: [
    {
      type: String,
      required: true,
    },
  ],
  answer: {             // Matches frontend 'answer'
    type: String,
    required: true,
  },
});

// Optional: Validator to enforce minimum options per question
QuestionSchema.path('options').validate(function (val) {
  return val.length >= 2;
}, 'Each question must have at least 2 options.');

// Main Quiz schema
const QuizSchema = new Schema(
  {
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
      required: true,
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    subject: {
      type: String,
      required: true,  // Required to prevent backend errors
    },
    level: {
      type: Number,
      required: true,  // Required to prevent backend errors
    },
    title: {
      type: String,
      required: true,
    },
    isOnline: {
      type: Boolean,
      default: true,
    },
    questions: {
      type: [QuestionSchema],
      required: true,
      validate: [
        (val) => val.length > 0,
        "At least one question is required in a quiz.",
      ],
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt
);

// Export the Quiz model
const Quiz = mongoose.model("Quiz", QuizSchema);
export default Quiz;
