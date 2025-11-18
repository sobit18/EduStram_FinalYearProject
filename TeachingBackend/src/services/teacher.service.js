import TeacherProfile from "../models/Teacher.js";
import StudentProfile from "../models/Student.js";
import User from "../models/User.js";
import Course from "../models/Course.js";
import Schedule from "../models/Schedule.js";
import Content from "../models/Content.js";
import Assignment from "../models/Assignment.js";
import Submit from "../models/Submit.js";
import Quiz from "../models/Quiz.js";
import Announcement from "../models/Announcement.js";


export const getAll = async () => {
  try {
    const teachers = await TeacherProfile.aggregate([
      {
        $lookup: {
          from: "users", // collection name in MongoDB is usually lowercase and plural
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $addFields: {
          userDetails: {
            fullName: "$userDetails.fullName",
            email: "$userDetails.email",
            phone: "$userDetails.phone",
            role: "$userDetails.role",
          },
        },
      },
    ]);

    return teachers;
  } catch (error) {
    throw error;
  }
};

export const getById = async (id) => {
  return await TeacherProfile.findById(id).populate("userId");
};

export const update = async (id, data) => {
  return await TeacherProfile.findByIdAndUpdate(id, data, { new: true });
};

export const remove = async (id) => {
  const profile = await TeacherProfile.findByIdAndDelete(id);
  if (profile) await User.findByIdAndDelete(profile.userId);
  return { message: "Teacher deleted" };
};

export const getCoursesByTeacherId = async (teacherId) => {
  return await Course.find({ teacherId }).lean();
};

export const getSchedulesByTeacherId = async (teacherId) => {
  return await Schedule.find({ teacherId }).lean();
};

export const getStudentsByFaculty = async ({ faculty }) => {
  try {
    const students = await StudentProfile.aggregate([
      {
        $match: { faculty }, // filter students by faculty
      },
      {
        $lookup: {
          from: "users", // collection name in MongoDB
          localField: "userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $addFields: {
          userDetails: {
            fullName: "$userDetails.fullName",
            email: "$userDetails.email",
            phone: "$userDetails.phone",
            role: "$userDetails.role",
          },
        },
      },
    ]);

    return students;
  } catch (error) {
    console.error("Error fetching students by faculty:", error);
    throw error;
  }
};

export const AddContent = async (
  courseId,
  { subject, level, chapter, title, description, teachinghours }
) => {
  // 1. Find the course first
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  // 2. Create new content with teacherId from course
  const newContent = new Content({
    courseId,
    teacherId: course.teacherId, // ✅ safe now
    subject,
    level,
    chapter,
    title,
    description,
    teachinghours,
  });

  const savedContent = await newContent.save();

  // 3. Push content into course.contents array
  course.contents.push(savedContent._id);
  await course.save();

  return savedContent.toObject();
};

export const getContentByTeacherId = async (teacherId) => {
  return await Content.find({ teacherId }).populate("courseId").lean();
};

export const AddAssignment = async (
  courseId,
  { subject, level, title, description, dueDate }
) => {
  // 1. Find the course first
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  // 2. Create new content with teacherId from course
  const newAssignment = new Assignment({
    courseId,
    teacherId: course.teacherId, // ✅ safe now
    subject,
    level,

    title,
    description,
    dueDate,
  });

  const savedAssignment = await newAssignment.save();

  // 3. Push content into course.contents array
  course.assignments.push(savedAssignment._id);
  await course.save();

  return savedAssignment.toObject();
};

export const getAssignmentByTeacherId = async (teacherId) => {
  return await Assignment.find({ teacherId }).populate("courseId").lean();
};

export const getSubmissionByteacharId = async (teacherId) => {
  return await Submit.find({ teacherId })
    .populate({
      path: "studentId",
      populate: {
        path: "userId",
        select: "fullName email", // get the teacher's name from User collection
      },
    }) // student info
    .populate("assignmentId", "title description dueDate"); // assignment info
};

export const updateSubmission = async (submissionId, grade, feedback) => {
  const submission = await Submit.findById(submissionId);
  if (!submission) throw new Error("Submission not found");

  // Update fields
  submission.grade = grade || submission.grade;
  submission.feedback = feedback || submission.feedback;

  // Automatically mark as graded if grade is provided
  if (grade) submission.status = "graded";

  await submission.save();
  return submission;
};

export const AddQuiz = async (
  courseId,
  {subject,level,faculty, title, questions ,}
) => {
  // 1. Find the course first
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  // 2. Create new content with teacherId from course
  const newQuiz = new Quiz({
    courseId,
    teacherId: course.teacherId, // ✅ safe now
    subject,
    level,
    faculty,
    title,
    questions,
  });

  const savedQuiz = await newQuiz.save();

  // 3. Push content into course.contents array
  course.quizs.push(savedQuiz._id);
  await course.save();

  return savedQuiz.toObject();
};

export const getQuizByTeacherId = async (teacherId) => {
  return await Quiz.find({ teacherId }).populate("courseId").lean();
};

export const getQuizByQuizId = async (quizId) => {
  return await Quiz.findOne({ _id: quizId}).populate("courseId").lean();
};


export const AddAnnouncement = async (
  courseId,
  { subject, level, title, announcement }
) => {
  // 1. Find the course first
  const course = await Course.findById(courseId);
  if (!course) throw new ApiError(404, "Course not found");

  // 2. Create new content with teacherId from course
  const newAnnouncement= new Announcement({
    courseId,
    teacherId: course.teacherId, // ✅ safe now
    subject,
    level,
    title,
    announcement,
  });

  const savedAnnouncement = await newAnnouncement.save();

  // 3. Push content into course.contents array
  course.announcements.push(savedAnnouncement._id);
  await course.save();

  return savedAnnouncement.toObject();
};

export const getAnnouncementByTeacherId = async (teacherId) => {
  return await Announcement.find({ teacherId }).populate("courseId").lean();
};