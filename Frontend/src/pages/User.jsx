import React, { useEffect, useState } from "react";
import { getUserApi } from "../api/user.api";
import {
  FaUser,
  FaBook,
  FaCertificate,
  FaCog,
  FaSignOutAlt,
  FaRegEdit,
  FaCalendarAlt,
} from "react-icons/fa";
import { MdDashboard, MdAssignment, MdQuiz } from "react-icons/md";
import { NavLink, Outlet } from "react-router-dom"; // fixed from 'react-router'

const User = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const res = await getUserApi();
        console.log("Fetched student:", res);
        setStudentData(res?.user || null);
      } catch (error) {
        console.error("Error fetching teacher details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudent();
  }, []);

  // const [isEditing, setIsEditing] = useState(false); // Add missing state

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-indigo-600 text-white py-4 px-6 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">EduStream</h1>
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center">
              <FaUser className="text-xl" />
            </div>
            <h2 className="text-xl  font-bold">
              {studentData?.userId?.fullName || "Loading..."}
            </h2>
             <p className="">
                {studentData?.level} {studentData?.faculty}
              </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="flex gap-2">
        {/* Sidebar */}
        <div className="w-1/6 h-screen bg-white rounded-lg shadow-md p-6 m-3 hidden md:block  top-16 left-0 z-10">
          <nav className="space-y-1 p-3 flex flex-col gap-3">
            <div className="flex flex-col gap-4 items-center ">
              <div className="relative mb-4 ">
                {/* <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center">
                  <FaUser className="text-4xl text-indigo-600" />
                </div> */}
                {/* <button
                  className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full"
                  onClick={() => setIsEditing(!isEditing)}
                >
                  <FaRegEdit className="text-sm" />
                </button> */}
              </div>
              {/* <h2 className="text-xl  font-bold">
                {studentData?.userId?.fullName || "Loading..."}
              </h2>
              <p className="">
                {studentData?.level} {studentData?.faculty}
              </p> */}
            </div>

            <div className="flex flex-col gap-4 mt-6">
              <NavLink
                to=""
                className="font-semibold flex text-lg items-center gap-2  p-2 rounded-md"
                
              >
                <MdDashboard className="text-xl" />
                <span>Dashboard</span>
              </NavLink>

              <NavLink
                to="course"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <FaBook className="text-lg" />
                <span>My Course</span>
              </NavLink>

              <NavLink
                to="userschedule"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <FaCalendarAlt className="text-lg" />
                <span>My Schedule</span>
              </NavLink>

              <NavLink
                to="assignment"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <MdAssignment className="text-lg" />
                <span>Assignment</span>
              </NavLink>
              <NavLink
                to="userannouncement"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <MdAssignment className="text-lg" />
                <span>Announcement</span>
              </NavLink>
              <NavLink
                to="quizzes"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <MdQuiz className="text-xl" />
                <span>Quizzes</span>
              </NavLink>

              {/* <NavLink
                to="certificate"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <FaCertificate className="text-lg" />
                <span>Certificate</span>
              </NavLink> */}

               <NavLink
                to="studentmeeting"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <FaCog className="text-lg" />
                <span>Class</span>
              </NavLink>

              {/* <NavLink
                to="setting"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <FaCog className="text-lg" />
                <span>Setting</span>
              </NavLink> */}

              <NavLink
                to="logout"
                className={({ isActive }) =>
                  isActive
                    ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                    : "flex text-xl items-center gap-2 p-2 hover:bg-gray-100 rounded"
                }
              >
                <FaSignOutAlt className="text-lg" />
                <span>Logout</span>
              </NavLink>
            </div>
          </nav>
        </div>

        {/* Outlet Content */}
        <div className="flex-1 p-3 w-full">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default User;
