import { Router } from "express";
import {
  getAllTeachers,
  getTeacherById,
  updateTeacher,
  deleteTeacher,
  getCoursesByTeacherId,
  getSchedulesByTeacherId,
  getStudentsByFaculty,
  AddContent,
  getContentByTeacherId,
  AddAssignment,
  getAssignmentByTeacherId,
  getSubmissionByteacharId,
  updateSubmission,
  AddQuiz,
  getQuizByTeacherId,
  getQuizByQuizId,
  AddAnnouncement,
  getAnnouncementByTeacherId,
  createMeet,
  getMeetingsByTeacherId,
} from "../controllers/teacher.controller.js";




import {
  authorize,
  isAuthenticated,
} from "../middleware/verifyToken.middleware.js";
import { upload } from "../middleware/multerConfig.js";

const router = Router();

router.use(isAuthenticated, authorize(["teacher"])); //to check whom are allowed to hits this api ex: this is only access by teacher
router.get("/", getAllTeachers);
router.get("/:id", getTeacherById);
router.put("/:id", updateTeacher);
router.delete("/:id", deleteTeacher);

router.get("/:teacherId/courses", getCoursesByTeacherId);

router.get("/:teacherId/schedules", getSchedulesByTeacherId);

router.post("/courses/:courseId/content",upload.single("description"),AddContent);
router.get("/:teacherId/contents",getContentByTeacherId);

router.post("/courses/:courseId/assignment",AddAssignment);
router.get("/:teacherId/assignment",getAssignmentByTeacherId);

router.get("/studentsubmission/:teacherId",getSubmissionByteacharId)
router.put("/submission/:submissionId", updateSubmission);

router.post("/courses/:courseId/quiz",AddQuiz);
router.get("/:teacherId/quiz",getQuizByTeacherId);
router.get("/quiz/:quizId",getQuizByQuizId);


router.post("/courses/:courseId/announcement",AddAnnouncement)
router.get("/:teacherId/announcement",getAnnouncementByTeacherId);

router.post("/students", getStudentsByFaculty);

router.post("/createmeet", createMeet);
router.get("/meetings/:teacherId", getMeetingsByTeacherId);
export default router;
