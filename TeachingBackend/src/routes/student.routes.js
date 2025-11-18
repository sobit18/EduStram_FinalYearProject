import { Router } from "express";
import {
  getAllStudents,
  getStudentById,
  updateStudent,
  deleteStudent,
  getCoursesForStudentController,
  getSchedulesForStudentController,
  getContentsForStudentController,
  getContentsByCourseId,
  getAssignmentForStudentController,
  submitAssignmentByStudent,
  getSubmissionsByStudent,
  getQuizForStudentController,
  getQuizByQuizId,
   getAnnouncementForStudentController,
   getMeetingsByLevelAndFaculty,
} from "../controllers/student.controller.js";
import { upload } from "../middleware/multerConfig.js";

const router = Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

router.post("/courses", getCoursesForStudentController);

router.post("/schedules", getSchedulesForStudentController);

router.post("/contents", getContentsForStudentController);

router.post("/assignment", getAssignmentForStudentController);

router.post("/submitassignment", upload.single("file"), submitAssignmentByStudent);
router.get("/submissions/:studentId", getSubmissionsByStudent);

router.get("/courses/:courseId/contents", getContentsByCourseId);

router.post("/quiz", getQuizForStudentController);
router.get("/quiz/:quizId",getQuizByQuizId);

router.post("/announcement", getAnnouncementForStudentController);

router.post("/meetings", getMeetingsByLevelAndFaculty);

export default router;