import asyncHandler from "../utils/asyncHandler.utils.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import AdminService from "../services/admin.service.js";
import { options } from "../config/cookie.config.js";
import { autoPasswordGenerate } from "../utils/autoPasswordgenerate.js";
import Admin from "../models/Admin.js";

class AdminController {
  login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    console.log("email and password is: ", email, " ", password);
    if (!email || !password) {
      return next(new ApiError(400, "Email and password are required"));
    }

    const admin = await AdminService.login(email, password);

    const authToken = admin.generateAuthToken();
    const refreshToken = admin.generateRefreshToken();

    res
      .cookie("authToken", authToken, {
        ...options,
        maxAge: 1000 * 60 * 60 * 24,
      }) // 1 day
      .cookie("refreshToken", refreshToken, {
        ...options,
        maxAge: 1000 * 60 * 60 * 24 * 7,
      }); // 7 days

    res.status(200).json(
      new ApiResponse(200, "Login successful", {
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
        authToken: authToken,
      })
    );
  });

  addTeacher = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const { fullName, email, phone, faculty, course } = req.body;
    const password = autoPasswordGenerate;

    const teacher = await AdminService.addTeacher(adminId, {
      fullName,
      email,
      phone,
      faculty,
      course,
      password,
    });

    res
      .status(201)
      .json(new ApiResponse(201, "Teacher added successfully", teacher));
  });

  editTeacher = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id; // Assuming only admins can edit teachers
    const teacherId = req.params.teacherId;

    const { fullName, email, phone, faculty, course } = req.body;

    const updatedTeacher = await AdminService.editTeacher(adminId, teacherId, {
      fullName,
      email,
      phone,
      faculty,
      course,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Teacher updated successfully", updatedTeacher)
      );
  });

  deleteTeacher = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const teacherId = req.params.teacherId;

    const result = await AdminService.deleteTeacher(adminId, teacherId);

    res
      .status(200)
      .json(new ApiResponse(200, "teacher deleted sucessfully", result));
  });

  deleteStudent = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const studentId = req.params.studentId;

    const result = await AdminService.deleteStudent(adminId, studentId);

    res
      .status(200)
      .json(new ApiResponse(200, "student deleted sucessfully", result));
  });

  addCourseToTeacher = asyncHandler(async (req, res, next) => {
    const { teacherId } = req.params;
    const { level, faculty, subject, duration, chapters } = req.body;

    const course = await AdminService.addCourseToTeacher(teacherId, {
      level,
      faculty,
      subject,
      duration,
      chapters,
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, "Course added to teacher successfully", course)
      );
  });

  getAllCourses = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const courses = await AdminService.getAllCourses(adminId);
    console.log("course details are:",courses);

    res
      .status(200)
      .json(new ApiResponse(200, "courses fetched successfully", courses));
  });

  editCourse = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id; // Assuming only admins can edit teachers
    const courseId = req.params.courseId;

    const { level, subject, chapters, faculty, duration } = req.body;

    const updatedCourse = await AdminService.editCourse(adminId, courseId, {
      level,
      subject,
      chapters,
      faculty,
      duration,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Teacher updated successfully", updatedCourse)
      );
  });

    deleteCourse = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const courseId = req.params.courseId;

    const result = await AdminService.deleteCourse(adminId, courseId);

    res
      .status(200)
      .json(new ApiResponse(200, "course deleted sucessfully", result));
  });

  // In controllers/admin.controller.js
  getAllTeachers = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const teachers = await AdminService.getAllTeachers(adminId);

    res
      .status(200)
      .json(new ApiResponse(200, "Teachers fetched successfully", teachers));
  });

  getAllUsers = asyncHandler(async (req, res, next) => {
    const users = await AdminService.getAllUsers();
    res.status(200).json(new ApiResponse(200, "All users fetched", users));
  });

  deleteUser = asyncHandler(async (req, res, next) => {
    const userId = req.params.id;
    await AdminService.deleteUser(userId);
    res.status(200).json(new ApiResponse(200, "User deleted successfully"));
  });

  getAdmin=async (req,res,next)=>{
    try {
      const {_id}=req.user;
      const admin= await Admin.findById(_id);
  
      res.status(200).json(new ApiResponse(200,"Admin is login",admin))
      
    } catch (error) {
      next(error);
    }
  }

  CreateSchedule = asyncHandler(async (req, res, next) => {
    const { teacherId } = req.params;
    const { level, faculty, subject, startTime, endTime} = req.body;

    const schedule = await AdminService.CreateSchedule(teacherId, {
      level,
      faculty,
      subject,
      startTime,
      endTime,
    });

    res
      .status(201)
      .json(
        new ApiResponse(201, "Schedule created sucessfully", schedule)
      );
  });

   getAllSchedule = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const schedules = await AdminService.getAllSchedule(adminId);
    console.log("schedules details are:",schedules);

    res
      .status(200)
      .json(new ApiResponse(200, "schedules fetched successfully", schedules));
  });

  deleteSchedule = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id;
    const scheduleId = req.params.scheduleId;

    const result = await AdminService.deleteSchedule(adminId, scheduleId);

    res
      .status(200)
      .json(new ApiResponse(200, "course deleted sucessfully", result));
  });

editSchedule = asyncHandler(async (req, res, next) => {
    const adminId = req.user._id; // Assuming only admins can edit teachers
    const scheduleId = req.params.scheduleId;

    const { level, subject, startTime, faculty, endTime } = req.body;

    const updatedSchedule = await AdminService.editSchedule(adminId, scheduleId, {
      level,
      subject,
      startTime,
      faculty,
      endTime,
    });

    res
      .status(200)
      .json(
        new ApiResponse(200, "Teacher updated successfully", updatedSchedule)
      );
  });


  }




export default new AdminController();
