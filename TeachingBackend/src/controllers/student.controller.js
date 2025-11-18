import * as studentService from "../services/student.service.js";
import asyncHandler from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import ApiError from "../utils/apiError.utils.js";
import Meeting from "../models/Meeting.js";

export const getAllStudents = asyncHandler(async (req, res) => {
  const data = await studentService.getAll();
  res
    .status(201)
    .json(new ApiResponse(201, "Students fetch sucessfully", data));
});

export const getStudentById = asyncHandler(async (req, res) => {
  const data = await studentService.getById(req.params.id);
  res.json(data);
});

export const updateStudent = asyncHandler(async (req, res) => {
  const data = await studentService.update(req.params.id, req.body);
  res.json(data);
});

export const deleteStudent = asyncHandler(async (req, res) => {
  const data = await studentService.remove(req.params.id);
  res.json(data);
});

export const getCoursesForStudentController = asyncHandler(async (req, res) => {
  const { level, faculty } = req.body;
  const courses = await studentService.getCoursesForStudent({ level, faculty });

  if (!courses || courses.length === 0) {
    throw new ApiError(404, "No courses found for this faculty");
  }
  res.json(new ApiResponse(200, "courses fetched sucessfully", courses));
});

export const getSchedulesForStudentController = asyncHandler(
  async (req, res) => {
    const { level, faculty } = req.body;
    const schedules = await studentService.getSchedulesForStudent({
      level,
      faculty,
    });

    if (!schedules || schedules.length === 0) {
      throw new ApiError(404, "No schedules found for this faculty");
    }
    res.json(new ApiResponse(200, "schedules fetched sucessfully", schedules));
  }
);

export const getContentsForStudentController = asyncHandler(
  async (req, res) => {
    const { level, faculty } = req.body; // use query params for GET

    if (!level || !faculty) {
      throw new ApiError(400, "Level and faculty are required");
    }

    const contents = await studentService.getContentsForStudent({
      level,
      faculty,
    });

    if (!contents || contents.length === 0) {
      throw new ApiError(404, "No contents found for this faculty and level");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "Contents fetched successfully", contents));
  }
);

export const getContentsByCourseId = asyncHandler(async (req, res) => {
  const { courseId } = req.params;
  const contents = await contentService.getContentsByCourseId(courseId);

  res
    .status(200)
    .json(new ApiResponse(200, "Contents fetched successfully", contents));
});

export const getAssignmentForStudentController = asyncHandler(
  async (req, res) => {
    const { level, faculty } = req.body; // use query params for GET

    if (!level || !faculty) {
      throw new ApiError(400, "Level and faculty are required");
    }

    const assignments = await studentService.getAssignmentForStudent({
      level,
      faculty,
    });

    if (!assignments || assignments.length === 0) {
      throw new ApiError(
        404,
        "No assignments found for this faculty and level"
      );
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, "assignments fetched successfully", assignments)
      );
  }
);

export const submitAssignmentByStudent = async (req, res) => {
  console.log("REQ BODY:", req.body); // <-- check if studentId, teacherId, assignmentId exist
  console.log("REQ FILE:", req.file);
  try {
    
    const { teacherId, studentId, assignmentId, answer } = req.body;
    const fileUrl = req.file ? req.file.path : null;

    const submission = await studentService.createSubmission({
      teacherId,
      studentId,
      assignmentId,
      answer,
      fileUrl,
    });

    res.status(201).json({
      message: "Assignment submitted successfully",
      submission,
    });
  } catch (error) {
    console.error("Submit Error:", error);
    res.status(500).json({ message: "Error submitting assignment", error });
  }
};

export const getSubmissionsByStudent = async (req, res) => {
  try {
    const { studentId } = req.params;
    if (!studentId)
      return res.status(400).json({ message: "Student ID required" });

    const submissions = await studentService.getSubmissionsByStudent(studentId);

    res.status(200).json(new ApiResponse(200, "Submissions fetched successfully", submissions));
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ message: "Error fetching submissions", error });
  }
};
export const getQuizForStudentController = asyncHandler(
  async (req, res) => {
    const { level, faculty } = req.body; // use query params for GET

    if (!level || !faculty) {
      throw new ApiError(400, "Level and faculty are required");
    }

    const quiz = await studentService.getQuizForStudent({
      level,
      faculty,
    });

    if (!quiz || quiz.length === 0) {
      throw new ApiError(404, "No quiz found for this faculty and level");
    }

    res
      .status(200)
      .json(new ApiResponse(200, "quiz fetched successfully", quiz));
  }
);

export const getQuizByQuizId = asyncHandler(async (req, res) => {
   console.log("Router hit! quizId:", req.params.quizId);
  const quiz = await studentService.getQuizByQuizId(
    req.params.quizId
  );
  console.log("No quiz found!");
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  res.status(200).json(new ApiResponse(200, "quiz fetch sucessfully", quiz));
});

export const getAnnouncementForStudentController = asyncHandler(
  async (req, res) => {
    const { level, faculty } = req.body; // use query params for GET

    if (!level || !faculty) {
      throw new ApiError(400, "Level and faculty are required");
    }

    const announcements = await studentService.getAnnouncementForStudent({
      level,
      faculty,
    });

    if (!announcements || announcements.length === 0) {
      throw new ApiError(
        404,
        "No announcements found for this faculty and level"
      );
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, "announcements fetched successfully", announcements)
      );
  }
);


export const getMeetingsByLevelAndFaculty = asyncHandler(async (req, res) => {
  const { level, faculty } = req.body;

  const meetings = await Meeting.find({ level, faculty });

  if (!meetings || meetings.length === 0) {
    return res.status(404).json({ message: "No meetings found" });
  }

  res.status(200).json(
    new ApiResponse(200, "Meetings fetched successfully", meetings)
  );
});
