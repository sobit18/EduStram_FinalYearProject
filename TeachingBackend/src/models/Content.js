import mongoose, { Schema } from "mongoose";

const ContentSchema=new mongoose.Schema({
    teacherId: {
      type: Schema.Types.ObjectId,
      ref: "Teacher",
    },
    courseId: {
      type: Schema.Types.ObjectId,
      ref: "Course",
      required: true,
    },
    subject:{
        type:String,
    },
    level:{
        type:Number,
    },
    chapter:{
        type:Number,
        required:true,
    },
    title:{
        type:String,
        requied:true,
    },
    description:{
        type:String,
        requied:true,
    },
    teachinghours:{
        type:Number,
        required:true,
    },
})
 const Content=mongoose.model("Content",ContentSchema);
 export default Content;