import { useState, useEffect } from "react";
import { Route, Routes, useNavigate, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Admin from "./pages/Admin";
import Dashboard from "./pages/Dashboard";
import TeacherManagement from "./pages/TeacherManagement";
import UserManagement from "./pages/UserManagement";
import CourseManagement from "./pages/CourseManagement";
import ContentManagement from "./pages/ContentManagement";
import Systemsetting from "./pages/Systemsetting";
import Addteacher from "./pages/Addteacher";
import Teacherdetails from "./pages/Teacherdetails";
import { checkAuth } from "./api/auth.api";
import Addcourses from "./pages/Addcourses";
import Coursedetails from "./pages/Coursedetails";
import Addcontent from "./pages/Addcontent";
import Contentdetails from "./pages/Contentdetails";
import ScheduleManagement from "./pages/ScheduleManagement";
import Logout from "./pages/Logout";
import Createschedule from "./pages/Createschedule";
import ScheduleDetails from "./pages/ScheduleDetails";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  console.log("Is authenticated: ",isAuthenticated);
  useEffect(() => {
    const fetchAuth = async () => {
      try {
        const res = await checkAuth(); // checks with token in axios interceptor
        console.log("Auth Check:", res);
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    fetchAuth();
  }, []);

  if (loading) return null;

  return (
    <Routes>
      {/* Public Login Route */}
      <Route
        path="/"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Login setIsAuthenticated={setIsAuthenticated} />
          )
        }
      />

      {/* Protected Admin Routes */}
      <Route
        path="/admin"
        element={isAuthenticated ? <Admin /> : <Navigate to="/" replace />}
      >
        <Route path="" element={<Dashboard />} />

        <Route path="teachermanagement" element={<TeacherManagement />} />
        <Route path="addteacher" element={<Addteacher />} />
        <Route path="teacherdetails" element={<Teacherdetails />} />

        <Route path="usermanagement" element={<UserManagement />} />

        <Route path="coursemanagement" element={<CourseManagement />} />
        <Route path="addcourse" element={<Addcourses/>} />
        <Route path="coursedetails" element={<Coursedetails/>} />

        <Route path="schedulemanagement" element={<ScheduleManagement/>}/>
        <Route path="createschedule" element={<Createschedule/>}/>
        <Route path="scheduledetails" element={<ScheduleDetails/>}/>

        <Route path="contentmanagement" element={<ContentManagement />} />
        <Route path="addcontent" element={<Addcontent/>} />
        <Route path="contentdetails" element={<Contentdetails/>}/>

        <Route path="systemsetting" element={<Systemsetting />} />

        <Route path="logout" element={<Logout/>}/>

      </Route>

      {/* Fallback route */}
      <Route
        path="*"
        element={
          isAuthenticated ? (
            <Navigate to="/admin" replace />
          ) : (
            <Navigate to="/" replace />
          )
        }
      />
    </Routes>
  );
}
