import mongoose, { Schema } from "mongoose";

const MeetingSchema = new Schema({
    title:{
        type:String,
    },
    description:{
        type:String,
    },
    courseId:{
        type:Schema.Types.ObjectId,
        ref:"Course",
    },
    teacherId:{
        type:Schema.Types.ObjectId,
        ref:"Teacher",
    },
    level:{
        type:String,
    },
    subject:{
        type:String,
    },
    faculty:{
        type:String,
    },
    startTime:{
        type:Date,
    },
    endTime:{
        type:Date,
    },
    meetLink:{
        type:String,
    },

})
 const Meeting=mongoose.model("Meeting",MeetingSchema);
 export default Meeting;



// const meetingSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   courseId: { type: mongoose.Schema.Types.ObjectId, ref: "Course" },
//   classLevel: String,
//   subject: String,
//   faculty: String,
//   startTime: Date,
//   endTime: Date,
//   meetLink: String,
//   createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
// }, { timestamps: true });

// export default mongoose.model("Meeting", meetingSchema);

