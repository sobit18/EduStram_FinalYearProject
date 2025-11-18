import React, { useEffect, useState } from "react";
import {
  FaChalkboardTeacher,
  FaBook,
  FaUsers,
  FaChartBar,
  FaCalendarAlt,
  FaBell,
  FaSignOutAlt,
  FaBullhorn,
} from "react-icons/fa";
import { MdAssignment, MdQuiz, MdVideoLibrary } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom";
import { getUserApi } from "../api/user.api";

const Teacher = () => {
  const [teacherData, setTeacherData] = useState(null);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const res = await getUserApi();
        console.log("Fetched teacher:", res);
        setTeacherData(res?.user?.userId || null);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTeacher();
  }, []);
  // console.log("teacherdata is",teacherData?.user?.userId?.fullName )
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-700 text-white py-4 px-6 shadow-lg fixed top-0 w-full z-20">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <FaChalkboardTeacher className="text-2xl" />
            <h1 className="text-xl font-bold">EduStream Teacher Portal</h1>
          </div>
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center">
                <FaChalkboardTeacher className="text-sm" />
              </div>
              <span className="font-medium">
                {teacherData?.fullName || "Loading..."}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex pt-20">
        {/* Sidebar */}
        <aside className="hidden md:block fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] mt-8 mx-2 bg-white rounded-r-lg shadow-md p-4 overflow-y-auto z-10">
          <nav className="space-y-1">
            <div className="flex flex-col gap-4">
              {/* <div className="flex flex-col items-center mb-6 p-4 border-b">
                <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center mb-3">
                  <FaChalkboardTeacher className="text-2xl text-indigo-600" />
                </div>
                <h2 className="font-bold text-center">
                  {teacherData?.fullName ?? "Loading..."}
                </h2>
              </div> */}
              
              {/* <div className="flex flex-col gap-4 mt-6"> */}
                            <NavLink
                              to=""
                              className="font-semibold flex text-lg items-center gap-2 p-2 rounded-md"
                              
                            >
                              <FaChartBar className="text-xl" />
                              <span>Dashboard</span>
                            </NavLink>
                            
             

              {[
                // { to: "", label: "Dashboard", icon: <FaChartBar className="text-xl" /> },
                { to: "student", label: "Student", icon: <FaUsers className="text-lg" /> },
                { to: "schedule", label: "Schedule", icon: <FaCalendarAlt className="text-lg" /> },
                { to: "mycourses", label: "My Course", icon: <FaBook className="text-lg" /> },
                { to: "content", label: "Content", icon: <MdVideoLibrary className="text-lg" /> },
                // { to: "mycontent", label: "MyContent", icon: <MdVideoLibrary className="text-lg" /> },
                { to: "assignment", label: "Assignment", icon: <MdAssignment className="text-lg" /> },
                // { to: "studentsubmit", label: "Assignment", icon: <MdAssignment className="text-lg" /> },
                // { to: "myassignment", label: "MyAssignment", icon: <MdAssignment className="text-lg" /> },
                { to: "quiz", label: "Quizzes", icon: <MdQuiz className="text-xl" /> },
                // { to: "teacherquiz", label: "Quizzes", icon: <MdQuiz className="text-xl" /> },
                { to: "announcement", label: "Announcement", icon: <FaBullhorn className="text-lg" /> },
                { to: "class", label: "Class", icon: <FaChalkboardTeacher className="text-lg" /> },
                // { to: "teachermeeting", label: "Class", icon: <FaChalkboardTeacher className="text-lg" /> },
                // { to: "myannouncement", label: "Announcement", icon: <FaBullhorn className="text-lg" /> },
                { to: "teacherlogout", label: "Logout", icon: <FaSignOutAlt className="text-lg" /> },
                // { to: "scheduletable", label: "ScheduleTable", icon: <FaCalendarAlt className="text-lg" /> },
              ].map(({ to, label, icon }) => (
                <NavLink
                  key={to}
                  to={to}
                  className={({ isActive }) =>
                    isActive
                      ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                      : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                  }
                >
                  {icon}
                  <span>{label}</span>
                </NavLink>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main content */}
        <main className="flex-1 p-6 md:ml-64">
          {loading ? <p>Loading content...</p> : <Outlet  />}
        </main>
      </div>
    </div>
  );
};

export default Teacher;
