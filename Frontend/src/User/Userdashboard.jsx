import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaBook,
  FaChartLine,
  FaCertificate,
  FaCog,
  FaSignOutAlt,
  FaRegEdit,
} from "react-icons/fa";
import {
  MdDashboard,
  MdAssignment,
  MdQuiz,
  MdVideoLibrary,
} from "react-icons/md";
import { getUserApi } from "../api/user.api";
import Usercoursetable from "./Usercoursetable";
import Userscheduletable from "./Userscheduletable";

const Userdashboard = () => {
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setStudentData((prev) => ({
      ...prev,
      userId: {
        ...prev.userId,
        [name]: value,
      },
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Dashboard</h1>
          <p className="text-gray-600">Welcome back, {studentData?.userId?.fullName || "Student"}!</p>
        </div>

        {/* Personal Information Row */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800 flex items-center">
              <FaUser className="mr-2 text-indigo-600" />
              Personal Information
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="flex items-center text-indigo-600 hover:text-indigo-800 transition-colors p-2 rounded-lg hover:bg-indigo-50"
            >
              <FaRegEdit className="mr-1" />
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  name="name"
                  value={studentData?.userId?.fullName || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={studentData?.userId?.email || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Level</label>
                <select
                  name="class"
                  value={studentData?.level || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="11th">11th</option>
                  <option value="12th">12th</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Faculty</label>
                <select
                  name="stream"
                  value={studentData?.faculty || ""}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
                >
                  <option value="Science">Science</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Arts">Arts</option>
                </select>
              </div>
              <div className="md:col-span-2 flex justify-end space-x-3 pt-4">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-5 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Name</p>
                <p className="font-medium text-gray-900">
                  {studentData?.userId?.fullName || "Not available"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Email</p>
                <p className="font-medium text-gray-900">
                  {studentData?.userId?.email || "Not available"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Level</p>
                <p className="font-medium text-gray-900">
                  {studentData?.level || "Not available"}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-sm text-gray-500 mb-1">Faculty</p>
                <p className="font-medium text-gray-900">
                  {studentData?.faculty || "Not available"}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* User Courses Row */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <FaBook className="mr-2 text-indigo-600" />
            Your Courses
          </h2>
          <Usercoursetable
            level={studentData?.level}
            faculty={studentData?.faculty}
          />
        </div>

        {/* User Schedule Row */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
            <MdAssignment className="mr-2 text-indigo-600" />
            Your Schedule
          </h2>
          <Userscheduletable
            level={studentData?.level}
            faculty={studentData?.faculty}
          />
        </div>
      </div>
    </div>
  );
};

export default Userdashboard;