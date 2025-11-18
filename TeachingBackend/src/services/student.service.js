import Announcement from "../models/Announcement.js";
import Assignment from "../models/Assignment.js";
import Content from "../models/Content.js";
import Course from "../models/Course.js";
import Quiz from "../models/Quiz.js";
import Schedule from "../models/Schedule.js";
import StudentProfile from "../models/Student.js";
import Submit from "../models/Submit.js";
import Teacher from "../models/Teacher.js";
import User from "../models/User.js";



export const getAll = async () => {
 try {
    const students = await StudentProfile.aggregate([
  {
    $lookup: {
      from: "users", // collection name in MongoDB is usually lowercase and plural
      localField: "userId",
      foreignField: "_id",
      as: "userDetails"
    }
  },
  {
    $unwind: "$userDetails"
  },
  {
    $addFields: {
      userDetails: {
        fullName: "$userDetails.fullName",
        email: "$userDetails.email",
        phone: "$userDetails.phone",
        role: "$userDetails.role"
      }
    }
  }
]);

return students;

  } catch (error) {
    throw error
  }
};



export const getById = async (id) => {
  return await StudentProfile.findById(id).populate("userId");
};

export const update = async (id, data) => {
  return await StudentProfile.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id) => {
  const profile = await StudentProfile.findByIdAndDelete(id);
  if (profile) await User.findByIdAndDelete(profile.userId);
  return { message: "Student deleted" };
};

export const getCoursesForStudent = async ({level,faculty}) => {
  return await Course.find({ level,faculty }).lean();
};

export const getSchedulesForStudent = async ({level,faculty}) => {
  return await Schedule.find({ level,faculty }).lean();
};

export const getContentsForStudent = async ({ level, faculty }) => {
  // Fetch all contents and populate courseId only if level/faculty match
  const contents = await Content.find()
    .populate({
      path: "courseId",
      match: { level, faculty },
    })
    .lean();

  // Remove contents where courseId did not match
  const filteredContents = contents.filter(c => c.courseId);

  return filteredContents;
};

export const getContentsByCourseId = async (courseId) => {
  return await Content.find({ courseId });
};

export const getAssignmentForStudent = async ({ level, faculty }) => {
  // Fetch all contents and populate courseId only if level/faculty match
  const assignments = await Assignment.find()
    .populate({
      path: "courseId",
      match: { level, faculty },
    })
    .lean();

  // Remove contents where courseId did not match
  const filteredAssignments = assignments.filter(c => c.courseId);

  return filteredAssignments;
};

export const createSubmission = async (data) => {
  const submission = new Submit(data);
  return await submission.save();
};

export const getSubmissionsByStudent = async (studentId) => {
   if (!studentId) throw new Error("studentId is required");
  return await Submit.find({ studentId })
        .populate({
      path: "teacherId",
      populate: {
        path: "userId",
        select: "fullName", // get the teacher's name from User collection
      },
    })        // get teacher name
    .populate("assignmentId", "title dueDate") // get assignment title and due date
    .sort({ createdAt: -1 });             // newest first
};

export const getQuizForStudent = async ({ level, faculty }) => {
  // Fetch all contents and populate courseId only if level/faculty match
  const quiz = await Quiz.find()
    .populate({
      path: "courseId",
      match: { level, faculty },
    })
    .lean();

  // Remove contents where courseId did not match
  const filteredQuiz = quiz.filter(c => c.courseId);

  return filteredQuiz;
};

export const getQuizByQuizId = async (quizId) => {
  return await Quiz.findOne({ _id: quizId}).populate("courseId").lean();
};

export const getAnnouncementForStudent = async ({ level, faculty }) => {
  // Fetch all contents and populate courseId only if level/faculty match
  const announcements = await Announcement.find()
    .populate({
      path: "courseId",
      match: { level, faculty },
    })
    .lean();

  // Remove contents where courseId did not match
  const filteredAnnouncements = announcements.filter(c => c.courseId);

  return filteredAnnouncements;
};