import React, { useState } from "react";
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
  FaFileUpload,
} from "react-icons/fa";
import UserManagement from "./UserManagement";
import Teacherdetails from "./Teacherdetails";
// import Userdetails from "./Userdetails";

function Dashboard() {
  // const [stats, setStats] = useState({
  //   totalStudents: 1245,
  //   totalTeachers: 42,
  //   activeCourses: 38,
  //   revenue: 284500,
  //   newRegistrations: 27,
  // });
  return (
    <>
      <div className="flex-1">
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-2xl font-bold mb-2">Admin Dashboard</h2>
            <p className="text-gray-600">
              Overview of platform statistics and recent activities
            </p>
          </div>

          {/* <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Total Students</p>
                  <p className="text-2xl font-bold text-indigo-600">
                    {stats.totalStudents}
                  </p>
                  <p className="text-sm text-green-600">
                    +{stats.newRegistrations} new
                  </p>
                </div>
                <div className="bg-indigo-100 p-3 rounded-full">
                  <FaUsers className="text-indigo-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Total Teachers</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.totalTeachers}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-full">
                  <FaChalkboardTeacher className="text-blue-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Active Courses</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.activeCourses}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-full">
                  <FaBook className="text-green-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Total Revenue</p>
                  <p className="text-2xl font-bold text-purple-600">
                    ₹{stats.revenue.toLocaleString()}
                  </p>
                </div>
                <div className="bg-purple-100 p-3 rounded-full">
                  <FaMoneyBillWave className="text-purple-600" />
                </div>
              </div>
            </div>
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-gray-600">Completion Rate</p>
                  <p className="text-2xl font-bold text-yellow-600">78%</p>
                </div>
                <div className="bg-yellow-100 p-3 rounded-full">
                  <FaChartLine className="text-yellow-600" />
                </div>
              </div>
            </div>
          </div> */}
          <div className="bg-white rounded-lg shadow-md  w-ful">
              <UserManagement/>
            </div>
          <div className="bg-white rounded-lg shadow-md w-ful">
              <Teacherdetails/>
            </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
