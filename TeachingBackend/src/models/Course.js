import mongoose,{Schema} from "mongoose";

const CourseSchema = new Schema({
    teacherId:{
      type:mongoose.Types.ObjectId,
      ref:"Teacher",
    },
    level: {
      type: Number,
      enum: [11,12],
      required: true,
      trim: true,
    },
    faculty: {
      type: String,
      required: true,
    },
    subject: {
      type: String,
      default: 0,
    },
    category: {
      type: String,
      trim: true,
    },

    // Enrolled students (Users)
    enrolledStudents: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // Is this course online or offline
    isOnline: {
      type: Boolean,
      default: true,
    },

    // Platform used if online
    teachingPlatform: {
      type: String,
      enum: ["Zoom", "Google Meet", "Microsoft Teams", "Skype", "YouTube Live", "Custom Platform"],
    },

    // Optional fields
    duration: {
      type: String, // e.g. "6 weeks", "3 months"
    },
    chapters:{
      type:Number,
    },

    // level: {
    //   type: Number,
    //   enum: ["11","12"],
    // },
    published: {
      type: Boolean,
      default: false,
    },
    contents: [{ type: mongoose.Schema.Types.ObjectId, ref: "Content" }],
    quizs: [{ type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }],
    assignments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Assignment" }],
    announcements: [{ type: mongoose.Schema.Types.ObjectId, ref: "Announcement" ,default: [] }],
  },
  { timestamps: true }
);

const Course = mongoose.model("Course", CourseSchema);
export default Course;
