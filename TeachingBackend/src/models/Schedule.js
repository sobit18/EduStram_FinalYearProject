import mongoose,{Schema} from "mongoose";


const ScheduleSchema=new mongoose.Schema({
    teacherId:{
        type:mongoose.Types.ObjectId,
        ref:"Teacher",
        required:true,
    },
    level:{
        type:Number,
        required:true,
    },
     faculty: {
      type: String,
      required: true,
    },
    subject:{
        type:String,
        required:true,
    },
    startTime:{
        type:String,
        required:true,
    },
    endTime:{
        type:String,
        required:true,
    },
    
})

const Schedule = mongoose.model("Schedule",ScheduleSchema);
export default Schedule;