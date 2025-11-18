import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";

// Pages
import User from "./pages/User";
import Teacher from "./pages/Teacher";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Main from "./pages/Main";
import Courses from "./pages/Courses";
import Features from "./pages/Features";
import Aboutus from "./pages/Aboutus";

// Teacher routes
import Dashboard from "./Teacher/Dashboard";
import Mycourses from "./Teacher/Mycourses";
import Student from "./Teacher/Student";
import Assignment from "./Teacher/Assignment";
import Quiz from "./Teacher/Quiz";
import Content from "./Teacher/Content";
import AddContent from "./Teacher/AddContent";
import Schedule from "./Teacher/Schedule";
import Scheduletable from "./Teacher/Scheduletable";
import Teacherlogout from "./Teacher/Teacherlogout";

// User routes
import Userdashboard from "./User/Userdashboard";
import Usercourse from "./User/Usercourse";
import UserCertificate from "./User/UserCertificate";
import Userassignment from "./User/Userassignment";
import Userquizzes from "./User/Userquizzes";
import Userlogout from "./User/Userlogout";
import Usersetting from "./User/Usersetting";


// API
import { getUserApi } from "./api/user.api";
import UserSchedule from "./User/UserSchedule";
import Usercoursetable from "./User/Usercoursetable";
import Userscheduletable from "./User/Userscheduletable";
import Mycontent from "./Teacher/Mycontent";
import Addassignment from "./Teacher/Addassignment";
import Myassignment from "./Teacher/Myassignment";
import UserSubmission from "./User/UserSubmission";
import StudentSubmit from "./Teacher/StudentSubmit";
import CreateQuiz from "./Teacher/CreateQuiz";
import TeacherQuiz from "./Teacher/TeacherQuiz";
import QuizPlay from "./Teacher/QuizPlay";
import StudentPlayQuiz from "./User/StudentPlayQuiz";
import Announcement from "./Teacher/Announcement";
import AddAnnouncement from "./Teacher/AddAnnouncement";
import MyAnnouncement from "./Teacher/MyAnnouncement";
import UserAnnouncement from "./User/UserAnnouncement";
import Class from "./Teacher/Class";
import CreateClass from "./Teacher/CreateClass";
import TeacherMeetings from "./Teacher/TeacherMeetings";
import StudentMeetings from "./User/StudentsMeetings";


// Protected Route Component
const ProtectedRoute = ({
  children,
  isAuthenticated,
  requiredRole,
  userRole,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && userRole !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};

// Public Route Component (redirects authenticated users)
const PublicRoute = ({ children, isAuthenticated, userRole }) => {
  if (isAuthenticated) {
    // Redirect based on role
    if (userRole === "teacher") {
      return <Navigate to="/teacher" replace />;
    } else if (userRole === "student") {
      return <Navigate to="/user" replace />;
    }
  }

  return children;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const [courses, setCourses] = useState([]);
  const [teacherId,setTeacherId]=useState([])
  const [studentId,setStudentId]=useState([])
  const [faculty,setFaculty]=useState([])
  const [level,setLevel]=useState([])

  useEffect(() => {
    const fetchMe = async () => {
      try {
        const res = await getUserApi();
        console.log("API Response:", res);
        setCourses(res?.user?.courses);

        if (res?.user?.userId?.role || res?.user?.role) {
          setIsAuthenticated(true);
          // Handle both possible response structures
          const userRole = res?.user?.userId?.role || res?.user?.role;
          setRole(userRole);

            if (userRole === "teacher") {
          setTeacherId(res?.user?._id);
        }
            if (userRole === "teacher") {
          setFaculty(res?.user?.faculty);
        }

            if (userRole === "student") {
          setFaculty(res?.user?.faculty);
        }
             if (userRole === "student") {
          setStudentId(res?.user?._id);
        }

            if (userRole === "student") {
          setLevel(res?.user?.level);
        }


          console.log("User authenticated with role:", userRole);
        } else {
          console.log("No valid user role found in response");
          setIsAuthenticated(false);
          setRole("");
        }
      } catch (err) {
        console.error("Authentication error:", err);
        setIsAuthenticated(false);
        setRole("");
      } finally {
        setLoading(false);
      }
    };

    fetchMe();
  }, []);

  // Debug current state
  useEffect(() => {
    console.log("Current route:", location.pathname);
    console.log(
      "isAuthenticated:",
      isAuthenticated,
      "role:",
      role,
      "loading:",
      loading
    );
  }, [isAuthenticated, role, loading, location.pathname]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="text-xl">Loading...</div>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route
        path="/"
        element={
          <PublicRoute isAuthenticated={isAuthenticated} userRole={role}>
            <Main />
          </PublicRoute>
        }
      >
        <Route path="" element={<Home />} />
        <Route path="courses" element={<Courses />} />
        <Route path="features" element={<Features />} />
        <Route path="aboutus" element={<Aboutus />} />
        <Route
          path="register"
          element={
            <PublicRoute isAuthenticated={isAuthenticated} userRole={role}>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="login"
          element={
            <PublicRoute isAuthenticated={isAuthenticated} userRole={role}>
              <Login
                setIsAuthenticated={setIsAuthenticated}
                setRole={setRole}
              />
            </PublicRoute>
          }
        />
      </Route>

      {/* Teacher Routes */}
      <Route
        path="/teacher"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            requiredRole="teacher"
            userRole={role}
          >
            <Teacher />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Dashboard teacherId={teacherId}/>} />
        <Route path="mycourses" element={<Mycourses courses={courses} />} />
        <Route path="mycontent" element={<Mycontent teacherId={teacherId}/>} />
        <Route path="student" element={<Student faculty={faculty}/>} />
        <Route path="assignment" element={<Assignment teacherId={teacherId}/>} />
        <Route path="myassignment" element={<Myassignment teacherId={teacherId}/>} />
        <Route path="myannouncement" element={<MyAnnouncement teacherId={teacherId}/>} />
        <Route path="studentsubmit" element={<StudentSubmit teacherId={teacherId}/>} />
        <Route path="addassignment" element={<Addassignment courses={courses} />} />
        <Route path="addannouncement" element={<AddAnnouncement courses={courses}/>} />
        <Route path="quiz" element={<Quiz teacherId={teacherId}/>} />
        <Route path="teacherquiz" element={<TeacherQuiz teacherId={teacherId}/>} />
        <Route path="playquiz/:quizId" element={<QuizPlay/>} />
         <Route path="announcement" element={<Announcement teacherId={teacherId}/>} />
        <Route path="createquiz" element={<CreateQuiz courses={courses}/>} />
        <Route path="content" element={<Content teacherId={teacherId}/>} />
        <Route path="addcontent" element={<AddContent courses={courses} />} />
        <Route path="schedule" element={<Schedule teacherId={teacherId}/>} />
        <Route path="scheduletable" element={<Scheduletable teacherId={teacherId}/>} />
        <Route path="class" element={<Class teacherId={teacherId}/>} />
        <Route path="teachermeeting" element={<TeacherMeetings teacherId={teacherId}/>} />
        <Route path="createclass" element={<CreateClass courses={courses} teacherId={teacherId}/>} />
        <Route
          path="teacherlogout"
          element={
            <Teacherlogout
              setIsAuthenticated={setIsAuthenticated}
              setRole={setRole}
            />
          }
        />
      </Route>

      {/* User/Student Routes */}
      <Route
        path="/user"
        element={
          <ProtectedRoute
            isAuthenticated={isAuthenticated}
            requiredRole="student"
            userRole={role}
          >
            <User />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<Userdashboard />} />
        <Route path="course" element={<Usercourse level={level} faculty={faculty}/>} />
        <Route path="usercoursetable" element={<Usercoursetable level={level} faculty={faculty}/>} />
        <Route path="userschedule" element={<UserSchedule level={level} faculty={faculty}/>} />
        <Route path="userscheduletable" element={<Userscheduletable level={level} faculty={faculty}/>} />
        <Route path="certificate" element={<UserCertificate />} />
        
       
        <Route path="assignment" element={<Userassignment level={level} faculty={faculty} studentId={studentId}/>} />
        <Route path="userannouncement" element={<UserAnnouncement level={level} faculty={faculty}/>} />
        <Route path="userassignment" element={<UserSubmission studentId={studentId}/>} />
        <Route path="quizzes" element={<Userquizzes  level={level} faculty={faculty}/>} />
        <Route path="studentplayquiz/:quizId" element={<StudentPlayQuiz />} />
        <Route path="setting" element={<Usersetting />} />
        <Route path="studentmeeting" element={<StudentMeetings level={level} faculty={faculty}/>} />
        <Route
          path="logout"
          element={
            <Userlogout
              setIsAuthenticated={setIsAuthenticated}
              setRole={setRole}
            />
          }
        />
      </Route>

      {/* Catch all route - redirect to home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
