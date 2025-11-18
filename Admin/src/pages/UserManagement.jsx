import React, { useEffect, useState } from "react";
import {
  FaEdit,
  FaTrash,
  FaSearch,
  FaFilter,
  FaUserGraduate,
  FaTimes,
} from "react-icons/fa";
import { deleteStudentApi, getStudentApi } from "../api/student.api";

function UserManagement() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [levelFilter, setLevelFilter] = useState("all");
  const [facultyFilter, setFacultyFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    console.log("useEffects in UserManagement");
    const fetchStudentDetails = async () => {
      try {
        console.log("check useEffec");
        const res = await getStudentApi();
        console.log("res is: ", res);
        setUsers(res?.user ?? []);
      } catch (error) {
        console.error("Error fetching student details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStudentDetails();
  }, []);

  // Apply filters whenever users, search term, level filter, or faculty filter changes
  useEffect(() => {
    let result = users;

    // Apply search filter
    if (searchTerm) {
      result = result.filter(
        (user) =>
          user?.userDetails?.fullName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user?.userDetails?.email
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          user?.level?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user?.faculty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply level filter
    if (levelFilter !== "all") {
      result = result.filter((user) => user.level === levelFilter);
    }

    // Apply faculty filter
    if (facultyFilter !== "all") {
      result = result.filter((user) =>
        user.faculty.toLowerCase().includes(facultyFilter.toLowerCase())
      );
    }

    setFilteredUsers(result);
  }, [users, searchTerm, levelFilter, facultyFilter]);

  const handleDelete = async (studentId) => {
    if (window.confirm("Are you sure you want to delete this student?")) {
      try {
        await deleteStudentApi(studentId);
        setUsers((prevUsers) =>
          prevUsers.filter((student) => student._id !== studentId)
        );
      } catch (error) {
        console.error("Error deleting student:", error);
        alert("Failed to delete student.");
      }
    }
  };

  const clearFilters = () => {
    setSearchTerm("");
    setLevelFilter("all");
    setFacultyFilter("all");
  };

  const hasActiveFilters =
    searchTerm || levelFilter !== "all" || facultyFilter !== "all";

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 flex items-center">
              <FaUserGraduate className="mr-3" />
              Student Management
            </h1>
            <p className="text-indigo-600 mt-2">
              Manage all students in the system
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            {/*  */}

            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center justify-center px-4 py-3 bg-indigo-100 text-indigo-700 rounded-xl hover:bg-indigo-200 transition-colors"
            >
              <FaFilter className="mr-2" />
              Filters
            </button>
          </div>

          {/* Expandable Filter Options */}
          {showFilters && (
            <div className="mt-4 p-4 bg-indigo-50 rounded-lg border border-indigo-100">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-indigo-800 mb-2">
                    Filter by Level
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setLevelFilter("all")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        levelFilter === "all"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      All Levels
                    </button>
                    <button
                      onClick={() => setLevelFilter("11")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        levelFilter === "11"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      Level 11
                    </button>
                    <button
                      onClick={() => setLevelFilter("12")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        levelFilter === "12"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      Level 12
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-indigo-800 mb-2">
                    Filter by Faculty
                  </label>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={() => setFacultyFilter("all")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        facultyFilter === "all"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      All Faculties
                    </button>
                    <button
                      onClick={() => setFacultyFilter("Science")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        facultyFilter === "Science"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      Science
                    </button>
                    <button
                      onClick={() => setFacultyFilter("Management")}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                        facultyFilter === "Management"
                          ? "bg-indigo-600 text-white"
                          : "bg-white text-indigo-700 hover:bg-indigo-100"
                      }`}
                    >
                      Management
                    </button>
                  </div>
                </div>
              </div>

              {hasActiveFilters && (
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-indigo-700">
                    Active filters:
                    {searchTerm && (
                      <span className="ml-2 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
                        Search: "{searchTerm}"
                      </span>
                    )}
                    {levelFilter !== "all" && (
                      <span className="ml-2 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
                        Level: {levelFilter}
                      </span>
                    )}
                    {facultyFilter !== "all" && (
                      <span className="ml-2 bg-indigo-100 text-indigo-700 px-2 py-1 rounded-md">
                        Faculty: {facultyFilter}
                      </span>
                    )}
                  </span>
                  <button
                    onClick={clearFilters}
                    className="flex items-center text-sm text-red-600 hover:text-red-800"
                  >
                    <FaTimes className="mr-1" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Results counter */}
          <div className="mt-4 flex items-center text-indigo-700">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z"
                clipRule="evenodd"
              />
            </svg>
            <span className="text-sm">
              Showing {filteredUsers.length} of {users.length} students
              {hasActiveFilters && " (filtered)"}
            </span>
          </div>
        </div>

        {/* Student Table */}
        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-indigo-800 font-medium">Loading students...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Student
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user, index) => (
                      <tr
                        key={user._id}
                        className="hover:bg-indigo-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-indigo-900 bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
                            {index + 1}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 h-10 w-10">
                              <div className="h-10 w-10 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                                {user?.userDetails?.fullName?.charAt(0) || "S"}
                              </div>
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-medium text-gray-900">
                                {user?.userDetails?.fullName || "N/A"}
                              </div>
                              <div className="text-xs text-gray-500">
                                ID: {user._id?.substring(0, 8)}...
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-4 w-4 text-indigo-500 mr-1"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                            >
                              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                            </svg>
                            {user?.userDetails?.email || "N/A"}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              user.level === "11"
                                ? "bg-blue-100 text-blue-800"
                                : user.level === "12"
                                ? "bg-purple-100 text-purple-800"
                                : "bg-indigo-100 text-indigo-800"
                            }`}
                          >
                            Level {user.level || "N/A"}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.faculty || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-colors">
                              <FaEdit />
                            </button>
                            <button
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                              onClick={() => handleDelete(user._id)}
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="6" className="px-6 py-12 text-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-16 w-16 mx-auto text-indigo-300 mb-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                          />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-700">
                          No students found
                        </h3>
                        <p className="text-gray-500 mt-1">
                          {hasActiveFilters
                            ? "Try adjusting your filters or search query"
                            : "There are no students in the system yet"}
                        </p>
                        {hasActiveFilters && (
                          <button
                            onClick={clearFilters}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
                          >
                            Clear all filters
                          </button>
                        )}
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredUsers.length > 0 && (
              <div className="bg-indigo-50 px-6 py-4 flex justify-between items-center">
                <div className="text-sm text-indigo-700">
                  Showing {filteredUsers.length} of {users.length} students
                </div>
                <div className="flex gap-2">
                  <button className="px-3 py-1.5 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors">
                    Previous
                  </button>
                  <button className="px-3 py-1.5 border border-indigo-200 rounded-lg bg-indigo-600 text-white">
                    1
                  </button>
                  <button className="px-3 py-1.5 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors">
                    2
                  </button>
                  <button className="px-3 py-1.5 border border-indigo-200 rounded-lg text-indigo-700 hover:bg-indigo-100 transition-colors">
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserManagement;
