import mongoose, { Schema } from "mongoose";

const AnnouncementSchema = new Schema({
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
    requieed: true,
  },
  announcement: {
    type: String,
    required: true,
  },
  },

{ timestamps: true });


// { timestamps: true }
const Announcement = mongoose.model("Announcement", AnnouncementSchema);
export default Announcement;
