import React from "react";
import { FaBook, FaClock, FaGraduationCap, FaChalkboardTeacher, FaFilter } from "react-icons/fa";

const Mycourses = ({ courses }) => {
  const [filterLevel, setFilterLevel] = React.useState("all");
  
  console.log("courses is", courses);

  // Filter courses based on level
  const filteredCourses = courses.filter(course => {
    return filterLevel === "all" || 
           (course.level && course.level.toString() === filterLevel);
  });

  // Count courses by level for the summary
  const courseCountByLevel = courses.reduce((acc, course) => {
    const level = course.level?.toString() || 'Unknown';
    acc[level] = (acc[level] || 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-md mb-5">
            <FaBook className="h-10 w-10 text-indigo-600" />
          </div>
          <h1 className="text-4xl font-bold text-indigo-900 mb-4">
            My Courses
          </h1>
          <p className="text-lg text-indigo-700 max-w-2xl mx-auto">
            Manage and track all your enrolled courses in one place
          </p>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 rounded-full mb-4">
              <FaBook className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-2xl font-bold text-indigo-900 mb-2">{courses.length}</h3>
            <p className="text-gray-600">Total Courses</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <FaGraduationCap className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-2xl font-bold text-blue-900 mb-2">
              {courseCountByLevel['11'] || 0}
            </h3>
            <p className="text-gray-600">Level 11 Courses</p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 text-center">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <FaChalkboardTeacher className="h-6 w-6 text-purple-600" />
            </div>
            <h3 className="text-2xl font-bold text-purple-900 mb-2">
              {courseCountByLevel['12'] || 0}
            </h3>
            <p className="text-gray-600">Level 12 Courses</p>
          </div>
        </div>

        {/* Filter Section */}
        <div className="mb-10 bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex items-center gap-3">
              <FaFilter className="h-5 w-5 text-indigo-500" />
              <span className="text-lg font-medium text-gray-700">Filter by Level:</span>
            </div>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setFilterLevel("all")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  filterLevel === "all" 
                    ? "bg-indigo-600 text-white" 
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                All Levels
              </button>
              <button
                onClick={() => setFilterLevel("11")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  filterLevel === "11" 
                    ? "bg-blue-600 text-white" 
                    : "bg-blue-100 text-blue-700 hover:bg-blue-200"
                }`}
              >
                Level 11
              </button>
              <button
                onClick={() => setFilterLevel("12")}
                className={`px-5 py-2.5 rounded-lg font-medium transition-colors ${
                  filterLevel === "12" 
                    ? "bg-purple-600 text-white" 
                    : "bg-purple-100 text-purple-700 hover:bg-purple-200"
                }`}
              >
                Level 12
              </button>
            </div>
          </div>
        </div>

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-indigo-800">
            {filteredCourses.length} {filteredCourses.length === 1 ? 'Course' : 'Courses'} Found
            {filterLevel !== "all" && ` for Level ${filterLevel}`}
          </h2>
          {filterLevel !== "all" && (
            <button
              onClick={() => setFilterLevel("all")}
              className="text-indigo-600 hover:text-indigo-800 text-sm font-medium flex items-center gap-1"
            >
              Clear filter
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </button>
          )}
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No courses found</h3>
            <p className="text-gray-500">
              {filterLevel !== "all" 
                ? `No courses available for Level ${filterLevel}` 
                : "You haven't enrolled in any courses yet"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
              >
                {/* Course Header with Color based on level */}
                <div className={`p-6 text-white ${
                  course.level?.toString() === "11" 
                    ? "bg-gradient-to-r from-blue-600 to-blue-700" 
                    : "bg-gradient-to-r from-purple-600 to-purple-700"
                }`}>
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-bold">{course.subject}</h2>
                    <span className="bg-white bg-opacity-20 px-3 py-1 rounded-full text-sm font-medium">
                      Level {course.level}
                    </span>
                  </div>
                  <p className="text-white text-opacity-90">{course.faculty}</p>
                </div>

                <div className="p-6">
                  {/* Duration */}
                  <div className="flex items-center justify-between mb-4 p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm font-medium text-gray-600 flex items-center">
                      <FaClock className="h-4 w-4 mr-2 text-indigo-500" />
                      Duration
                    </span>
                    <span className="text-sm font-semibold text-indigo-700">
                      {course.duration} weeks
                    </span>
                  </div>

                  {/* Chapters */}
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg mb-6">
                    <span className="text-sm font-medium text-gray-600 flex items-center">
                      <FaBook className="h-4 w-4 mr-2 text-indigo-500" />
                      Chapters
                    </span>
                    <span className="text-sm font-semibold text-indigo-700">
                      {course.chapters}
                    </span>
                  </div>

                  {/* Action Button */}
                  {/* <button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition-colors">
                    View Course
                  </button> */}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Mycourses;