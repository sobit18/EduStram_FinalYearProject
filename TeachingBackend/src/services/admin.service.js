import Admin from "../models/Admin.js";
import Teacher from "../models/Teacher.js";
import Course from "../models/Course.js";
import Schedule from "../models/Schedule.js";
import User from "../models/User.js";
import ApiError from "../utils/apiError.utils.js";
import Student from "../models/Student.js";
import Assignment from "../models/Assignment.js";
import Content from "../models/Content.js";
import Quiz from "../models/Quiz.js";

class AdminService {
  async login(email, password) {
    const admin = await Admin.findOne({ email });
    if (!admin) throw new ApiError(401, "Invalid credentials");

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) throw new ApiError(401, "Invalid credentials");

    return admin;
  }

  async addTeacher(
    adminId,
    { fullName, email, phone, faculty, course, password }
  ) {
    // Ensure email uniqueness for teacher
    console.log("admin Id ", adminId);
    const existingTeacher = await Teacher.findOne({ email });
    if (existingTeacher)
      throw new ApiError(400, "Teacher email already exists");

    const newTeacher = new Teacher({
      fullName,
      email,
      phone,
      faculty,
      course,
      password,
      adminId,
    });

    return (await newTeacher.save()).toObject();
  }

  // In your AdminService
  async editTeacher(adminId, teacherId, { fullName, email, phone, faculty, course }) {
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    if (teacher.adminId.toString() !== adminId.toString())
      throw new ApiError(403, "Not authorized");

    if (!teacher.userDetails) teacher.userDetails = {};

    // Update only if changed
    if (fullName && fullName !== teacher.userDetails.fullName) {
      teacher.userDetails.fullName = fullName;
    }

    // Check if email is different AND not used by another teacher
    if (email && email !== teacher.userDetails.email) {
      const emailExists = await Teacher.findOne({ "userDetails.email": email });
      if (emailExists) throw new ApiError(400, "Email already in use by another teacher");
      teacher.userDetails.email = email;
    }

    // Check if phone is different AND not used by another teacher
    if (phone && phone !== teacher.phone) {
      const phoneExists = await Teacher.findOne({ phone });
      if (phoneExists) throw new ApiError(400, "Phone already in use by another teacher");
      teacher.phone = phone;
    }

    if (faculty && faculty !== teacher.faculty) teacher.faculty = faculty;
    if (course && course !== teacher.course) teacher.course = course;

    return (await teacher.save()).toObject();
  }

  editCourse = async (adminId, courseId, updateData) => {
    // Find the course
    const course = await Course.findById(courseId);
    if (!course) {
      throw new Error("Course not found");
    }

    // Optional: check if this admin owns the course
    // if (course.adminId.toString() !== adminId.toString()) {
    //   throw new Error("Not authorized to edit this course");
    // }

    // Update only provided fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        course[key] = updateData[key];
      }
    });

    // Save and return the updated course
    const updatedCourse = await course.save();
    return updatedCourse;
  };




  //Delete teacher
 async deleteTeacher(adminId, teacherId) {
  const teacher = await Teacher.findById(teacherId);

  if (!teacher) {
    throw new ApiError(404, "Teacher not found");
  }

  // Optional: check if this admin owns the teacher
  if (teacher.adminId.toString() !== adminId.toString()) {
    throw new ApiError(403, "Not authorized to delete this teacher");
  }

  // Delete all assignments of this teacher
  await Assignment.deleteMany({ teacherId });
  await Schedule.deleteMany({ teacherId });
  await Quiz.deleteMany({ teacherId });
  await Content.deleteMany({ teacherId });

  


  // Delete all courses of this teacher
  await Course.deleteMany({ teacherId });

  // Finally, delete the teacher
  await teacher.deleteOne();

  return { message: "Teacher and all related courses & assignments deleted successfully" };
}

  //delete student
  async deleteStudent(adminId, studentId) {
    const student = await Student.findById(studentId);

    if (!student) {
      throw new ApiError(404, "Student not found");
    }

    // Optional: check if this admin owns the teacher
    // if (student.adminId.toString() !== adminId.toString()) {
    //   throw new ApiError(403, "Not authorized to delete this student");
    // }

    await student.deleteOne(); // or teacher.remove()
    return { message: "Teacher deleted successfully" };
  }

  //jHelper function , generateAutoPassword

  async addCourseToTeacher(
    teacherId,
    { level, faculty, subject, duration, chapters }
  ) {
    console.log("teacher id", teacherId);
    // Create course
    const newCourse = new Course({
      level,
      faculty,
      subject,
      duration,
      chapters,
      teacherId,
    });
    const savedCourse = await newCourse.save();

    console.log("savedCourse: ", savedCourse);

    // Add course to teacher's courses array
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    teacher.courses.push(savedCourse._id);
    (await teacher.save()).toObject();

    return savedCourse.toObject();
  }

  //get all courses
  async getAllCourses(adminId) {
    return await Course.find().populate({
      path: "teacherId",
      model: "TeacherProfile", // ✅ This matches your Teacher model
      populate: {
        path: "userId", // ✅ Inside TeacherProfile
        model: "User",
        select: "fullName email", // Optional: choose the fields you want
      },
    });
  }

  //delete specific courses
  async deleteCourse(adminId, courseId) {
    const course = await Course.findById(courseId);

    if (!course) {
      throw new ApiError(404, "Course not found");
    }

    // Optional: check if this admin owns the teacher
    // if (Course.adminId.toString() !== adminId.toString()) {
    //   throw new ApiError(403, "Not authorized to delete this ourse");
    // }

    await course.deleteOne(); // or teacher.remove()
    return { message: "Course deleted successfully" };
  }

  // In services/admin.service.js
  async getAllTeachers(adminId) {
    // Fetch all teachers created by this admin
    return await Teacher.find({ adminId }).select("-password");
  }

  async getAllUsers() {
    // Fetch all users excluding passwords
    return User.find().select("-password").lean();
  }

  async deleteUser(userId) {
    const user = await User.findById(userId);
    if (!user) throw new ApiError(404, "User not found");

    await user.deleteOne();
  }

  async CreateSchedule(
    teacherId,
    { level, faculty, subject, startTime, endTime }
  ) {
    console.log("teacher id", teacherId);
    // Create schedule
    const newSchedule = new Schedule({
      level,
      faculty,
      subject,
      endTime,
      startTime,
      teacherId,
    });
    const savedSchedule = await newSchedule.save();

    console.log("savedSchedule: ", savedSchedule);

    // Add course to teacher's courses array
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) throw new ApiError(404, "Teacher not found");

    teacher.schedules.push(savedSchedule._id);
    (await teacher.save()).toObject();

    return savedSchedule.toObject();
  }

  async getAllSchedule(adminId) {
    return await Schedule.find().populate({
      path: "teacherId",
      model: "TeacherProfile", // ✅ This matches your Teacher model
      populate: {
        path: "userId", // ✅ Inside TeacherProfile
        model: "User",
        select: "fullName email", // Optional: choose the fields you want
      },
    });
  }

  async deleteSchedule(adminId, scheduleId) {
    const schedule = await Schedule.findById(scheduleId);

    if (!schedule) {
      throw new ApiError(404, "Schedule not found");
    }

    await schedule.deleteOne(); // or teacher.remove()
    return { message: "Schedule deleted successfully" };
  }

   editSchedule = async (adminId, scheduleId, updateData) => {
  
    const schedule = await Schedule.findById(scheduleId);
    if (!schedule) {
      throw new Error("Course not found");
    }

    // Update only provided fields
    Object.keys(updateData).forEach((key) => {
      if (updateData[key] !== undefined) {
        schedule[key] = updateData[key];
      }
    });

    // Save and return the updated course
    const updatedSchedule = await schedule.save();
    return updatedSchedule;
  };
}

export default new AdminService();
