import React, { useEffect, useState } from "react";
import {
  FaUsers,
  FaChalkboardTeacher,
  FaBook,
  FaChartLine,
  FaUniversity,
  FaMoneyBillWave,
  FaCog,
  FaSignOutAlt,
  FaBell,
  FaSearch,
  FaUserPlus,
  FaClock,
  FaFileUpload,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdQuiz,
  MdVideoLibrary,
} from "react-icons/md";
import { Link, NavLink, Outlet } from "react-router-dom";

const Admin = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [stats, setStats] = useState({
    totalStudents: 1245,
    totalTeachers: 42,
    activeCourses: 38,
    revenue: 284500,
    newRegistrations: 27,
  });

  return (
    <>
      <div>
        <div>
          <header className="bg-indigo-800 text-white py-4 px-6 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <FaUniversity className="text-2xl" />
                <h1 className="text-xl font-bold">EduStream Admin Portal</h1>
              </div>
              <div className="flex items-center space-x-6">
                
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center">
                    <FaUserPlus className="text-sm" />
                  </div>
                  <span className="font-medium">Admin</span>
                </div>
              </div>
            </div>
          </header>
        </div>
        <div className="flex ">
          <div className="p-3">
            {" "}
            <div className="w-2/5 md:w-64 h-screen bg-white rounded-lg shadow-md p-4">
              <nav className="space-y-1">
                <div className="flex flex-col gap-4">
                  <NavLink
                    to="" 
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex text-lg items-center gap-2  p-2 rounded-md"
                        : "text-gray-500 flex text-lg items-center gap-2"
                    }
                  >
                    <MdDashboard className="text-xl" />
                    <span>Dashboard</span>
                  </NavLink>

                  <NavLink
                    to="usermanagement"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                        : "text-gray-500 flex text-lg items-center gap-2"
                    }
                  >
                    <FaUsers className="text-lg" />
                    <span>Student Management</span>
                  </NavLink>

                  <NavLink
                    to="teachermanagement"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                        : "text-gray-500 flex text-lg items-center gap-2"
                    }
                  >
                    <FaChalkboardTeacher className="text-lg" />
                    <span>Teacher Management</span>
                  </NavLink>

                  <NavLink
                    to="coursemanagement"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                        : "text-gray-500 flex text-lg items-center gap-2"
                    }
                  >
                    <FaBook className="text-lg" />
                    <span>Course Management</span>
                  </NavLink>

                  <NavLink
                    to="schedulemanagement"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                        : "text-gray-500 flex text-lg items-center gap-2"
                    }
                  >
                    <FaClock className="text-lg" />
                    <span>ScheduleManagement</span>
                  </NavLink>

                  {/* <Link
                    to="contentmanagement"
                    className="flex text-xl items-center gap-2"
                  >
                    <MdVideoLibrary className="text-xl" />
                    <span>Content Management</span>
                  </Link> */}

                  {/* <NavLink
                    to="systemsetting"
                    className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                        : "text-gray-500 flex text-lg items-center gap-2"
                    }
                  >
                    <FaCog className="text-lg" />
                    <span>System Settings</span>
                  </NavLink> */}

                  <NavLink to="logout" className={({ isActive }) =>
                      isActive
                        ? "font-semibold flex text-lg items-center gap-2 bg-blue-300 p-2 rounded-md"
                        : "text-gray-500 flex text-lg items-center gap-2"
                    }>
                    <FaSignOutAlt className="text-lg" />
                    <span>Logout</span>
                  </NavLink>
                </div>
              </nav>
            </div>
          </div>
          <div className="p-3 w-full">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
