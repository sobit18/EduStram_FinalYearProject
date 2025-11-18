import { google } from "googleapis";
import Meeting from "../models/Meeting.js";
import Teacher from "../models/Teacher.js";
import * as teacherService from "../services/teacher.service.js";
import ApiError from "../utils/apiError.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import asyncHandler from "../utils/asyncHandler.utils.js";

export const getAllTeachers = asyncHandler(async (req, res) => {
  const data = await teacherService.getAll();
  res
    .status(200)
    .json(new ApiResponse(200, "Teacher details fetch succesfully", data));
});

export const getTeacherById = asyncHandler(async (req, res) => {
  const data = await teacherService.getById(req.params.id);
  res.json(data);
});

export const updateTeacher = asyncHandler(async (req, res) => {
  const data = await teacherService.update(req.params.id, req.body);
  res.json(data);
});

export const deleteTeacher = asyncHandler(async (req, res) => {
  const data = await teacherService.remove(req.params.id);
  res.json(data);
});

export const getCoursesByTeacherId = asyncHandler(async (req, res) => {
  const courses = await teacherService.getCoursesByTeacherId(req.params.id);

  if (!courses || courses.length === 0) {
    throw new ApiError(404, "No courses found for this teacher");
  }
  res.json(courses);
});

export const getSchedulesByTeacherId = asyncHandler(async (req, res) => {
  const { teacherId } = req.params;
  const schedules = await teacherService.getSchedulesByTeacherId(teacherId);

  if (!schedules || schedules.length === 0) {
    throw new ApiError(404, "No schedules found for this teacher");
  }
  res.json(new ApiResponse(200, "schedule fetched sucessfully", schedules));
});

export const getStudentsByFaculty = asyncHandler(async (req, res) => {
  const { faculty } = req.body;
  const students = await teacherService.getStudentsByFaculty({ faculty });

  if (!students || students.length === 0) {
    throw new ApiError(404, "No students found for this faculty");
  }
  res.json(new ApiResponse(200, "students fetched sucessfully", students));
});

export const AddContent = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const { chapter, title, teachinghours, subject, level, description } =
    req.body;

  const pdfPath = req.file ? req.file.path : null;

  const content = await teacherService.AddContent(courseId, {
    subject,
    level,
    chapter,
    title,
    teachinghours,
    description: req.file.filename,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, "sontent added by teacher successfully", content)
    );
});

export const getContentByTeacherId = asyncHandler(async (req, res) => {
  const contents = await teacherService.getContentByTeacherId(
    req.params.teacherId
  );

  if (!contents || contents.length === 0) {
    throw new ApiError(404, "No contents found for this teacher");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "content fetch sucessfully", contents));
});

export const AddAssignment = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const { title, subject, level, description, dueDate } = req.body;

  const assignment = await teacherService.AddAssignment(courseId, {
    subject,
    level,
    title,
    description,
    dueDate,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, "sontent added by teacher successfully", assignment)
    );
});

export const getAssignmentByTeacherId = asyncHandler(async (req, res) => {
  const assignments = await teacherService.getAssignmentByTeacherId(
    req.params.teacherId
  );

  if (!assignments || assignments.length === 0) {
    throw new ApiError(404, "No assigbnments found for this teacher");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "assignment fetch sucessfully", assignments));
});

export const getSubmissionByteacharId = async (req, res) => {
  try {
    const { teacherId } = req.params;
    if (!teacherId)
      return res.status(400).json({ message: "Student ID required" });

    const submissions = await teacherService.getSubmissionByteacharId(
      teacherId
    );

    res
      .status(200)
      .json(
        new ApiResponse(200, "Submissions fetched successfully", submissions)
      );
  } catch (error) {
    console.error("Fetch Submissions Error:", error);
    res.status(500).json({ message: "Error fetching submissions", error });
  }
};

export const updateSubmission = async (req, res) => {
  try {
    const { submissionId } = req.params;
    const { grade, feedback } = req.body;

    if (!submissionId)
      return res.status(400).json({ message: "Submission ID required" });

    const updatedSubmission = await teacherService.updateSubmission(
      submissionId,
      grade,
      feedback
    );

    res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Submission updated successfully",
          updatedSubmission
        )
      );
  } catch (error) {
    console.error("Update submission error:", error);
    res
      .status(500)
      .json({ message: "Error updating submission", error: error.message });
  }
};

export const AddQuiz = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const { title, questions, subject, level, faculty } = req.body;

  if (!title || !questions || questions.length === 0) {
    throw new ApiError(400, "Title and questions are required");
  }

  const quiz = await teacherService.AddQuiz(courseId, {
    subject,
    title,
    level,
    faculty,
    questions,
  });

  res
    .status(201)
    .json(new ApiResponse(201, "quiz added by teacher successfully", quiz));
});

export const getQuizByTeacherId = asyncHandler(async (req, res) => {
  const quizs = await teacherService.getQuizByTeacherId(req.params.teacherId);

  if (!quizs || quizs.length === 0) {
    throw new ApiError(404, "No quizs found for this teacher");
  }
  res.status(200).json(new ApiResponse(200, "quiz fetch sucessfully", quizs));
});

export const getQuizByQuizId = asyncHandler(async (req, res) => {
  console.log("Router hit! quizId:", req.params.quizId);
  const quiz = await teacherService.getQuizByQuizId(req.params.quizId);
  console.log("No quiz found!");
  if (!quiz) {
    throw new ApiError(404, "Quiz not found");
  }

  res.status(200).json(new ApiResponse(200, "quiz fetch sucessfully", quiz));
});


export const AddAnnouncement = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;
  const { title, subject, level, announcement } = req.body;

  const announcements = await teacherService.AddAnnouncement(courseId, {
    subject,
    level,
    title,
    announcement,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, "annnouncement added by teacher successfully", announcements)
    );
});

export const getAnnouncementByTeacherId = asyncHandler(async (req, res) => {
  const announcements = await teacherService.getAnnouncementByTeacherId(
    req.params.teacherId
  );

  if (!announcements || announcements.length === 0) {
    throw new ApiError(404, "No announcement found for this teacher");
  }
  res
    .status(200)
    .json(new ApiResponse(200, "announcement fetch sucessfully", announcements));
});

export const createMeet = async (req, res) => {
  try {
    const { teacherId, title, startTime, endTime, subject, faculty, level } = req.body;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher?.tokens?.accessToken) {
      return res.status(400).json({ message: "Google not connected" });
    }

    const oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_CALLBACK_URL
    );

    oAuth2Client.setCredentials({ access_token: teacher.tokens.accessToken });

    const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

    const event = {
      summary: title,
      description: `Faculty: ${faculty}, Level: ${level}, Subject: ${subject}`,
      start: { dateTime: new Date(startTime).toISOString() },
      end: { dateTime: new Date(endTime).toISOString() },
      conferenceData: { createRequest: { requestId: `meet-${Date.now()}` } },
    };

    const response = await calendar.events.insert({
      calendarId: "primary",
      requestBody: event,
      conferenceDataVersion: 1,
    });

    await Meeting.create({
      teacherId,
      title,
      faculty,
      level,
      subject,
      meetLink: response.data.hangoutLink,
      startTime,
      endTime,
    });

    res.json({ message: "Meeting created", meetLink: response.data.hangoutLink });
  } catch (err) {
    console.error("Create Meet ERROR:", err);
    res.status(500).json({ message: "Failed to create meeting" });
  }
};



export const getMeetingsByTeacherId = asyncHandler(async (req, res) => {

  console.log("req.user:", req.user);
console.log("teacherId param:", req.params.teacherId);
  const { teacherId } = req.params;
  const meetings = await Meeting.find({teacherId });

  if (!meetings || meetings.length === 0) {
    return res.status(404).json({ message: "No meetings found" });
  }

  res.status(200).json(new ApiResponse(200, "Meetings fetched successfully", meetings));
});