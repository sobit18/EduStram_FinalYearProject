import express from "express";
import AdminController from "../controllers/admin.controller.js";
import { isAuthenticated, authorize } from "../middleware/verifyToken.middleware.js";
import { registerUser } from "../controllers/auth.controller.js";
import Admin from "../models/Admin.js";
import { ApiResponse } from "../utils/apiResponse.utils.js";
import { getAllTeachers } from "../controllers/teacher.controller.js";
import { getAllStudents } from "../controllers/student.controller.js";



const router = express.Router();

router.post("/login", AdminController.login);
router.use(isAuthenticated, authorize(['admin']));

router.get("/check-auth",AdminController.getAdmin)

// Protected routes - only admin allowed

router.post("/teacher", registerUser);//add teacher by admin
router.get("/teachers",getAllTeachers);
router.get("/teachers",getAllTeachers);
router.put("/teacher/:teacherId", AdminController.editTeacher);
router.delete("/teacher/:teacherId", AdminController.deleteTeacher);
router.delete("/user/:studentId", AdminController.deleteStudent);
// In routes/admin.routes.js

router.post("/teacher/:teacherId/course", AdminController.addCourseToTeacher);
router.get("/courses", AdminController.getAllCourses);
router.delete("/courses/:courseId", AdminController.deleteCourse);
router.put("/courses/:courseId", AdminController.editCourse);

router.post("/teacher/:teacherId/schedule", AdminController.CreateSchedule);
router.get("/schedules", AdminController.getAllSchedule);
router.delete("/schedules/:scheduleId", AdminController.deleteSchedule);
router.put("/schedules/:scheduleId", AdminController.editSchedule);


// Get all users (students)
router.get('/users',getAllStudents);

// Delete user by ID
router.delete('/users/:id', AdminController.deleteUser);


export default router;
