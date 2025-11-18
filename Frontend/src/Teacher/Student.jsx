import React, { useEffect, useState } from 'react'
import { getStudentByFacultyApi } from '../api/user.api';

function Student({faculty}) {
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [levelFilter, setLevelFilter] = useState("all"); // "all", "11", "12"
  console.log("faculty is",faculty)

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const res = await getStudentByFacultyApi(faculty); // pass faculty here
        console.log("student details",res)
        setStudents(res.user  || []); // backend should return array
      } catch (err) {
        console.error("Error fetching students:", err);
        setError("Failed to load students.");
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, []);

  // Apply filter when students or filter changes
  useEffect(() => {
    if (levelFilter === "all") {
      setFilteredStudents(students);
    } else {
      setFilteredStudents(
        students.filter(student => student.level.toString() === levelFilter)
      );
    }
  }, [students, levelFilter]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block relative w-16 h-16 mb-4">
            <div className="absolute inset-0 bg-indigo-600 rounded-full animate-ping"></div>
            <div className="absolute inset-2 bg-indigo-700 rounded-full"></div>
          </div>
          <p className="text-indigo-800 font-medium text-lg">Loading students...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md text-center">
          <div className="text-red-500 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h3>
          <p className="text-gray-600">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }
 
  return (
    <>
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white rounded-2xl shadow-md mb-5">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-indigo-900 mb-3">
            Student Directory
          </h1>
          <p className="text-lg text-indigo-700 max-w-2xl mx-auto">
            Browse and manage student information for {faculty || "your faculty"}
          </p>
          <div className="mt-4 inline-flex items-center bg-indigo-100 text-indigo-800 rounded-full px-4 py-2 font-medium">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
            </svg>
            Total Students: {students.length}
          </div>
        </div>

        {/* Filter Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-xl font-semibold text-indigo-900">Filter Students</h2>
            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => setLevelFilter("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  levelFilter === "all"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                All Students
              </button>
              <button
                onClick={() => setLevelFilter("11")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  levelFilter === "11"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                Level 11
              </button>
              <button
                onClick={() => setLevelFilter("12")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  levelFilter === "12"
                    ? "bg-indigo-600 text-white"
                    : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
                }`}
              >
                Level 12
              </button>
            </div>
          </div>
          
          {/* Results count */}
          <div className="mt-4 flex items-center text-indigo-700">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
            </svg>
            <span className="text-sm">
              Showing {filteredStudents.length} of {students.length} students
              {levelFilter !== "all" && ` in Level ${levelFilter}`}
            </span>
          </div>
        </div>

        {/* Student Table */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
          {/* Table Header */}
          <div className="grid grid-cols-4 bg-gradient-to-r from-indigo-700 to-indigo-600 text-white font-semibold px-6 py-5">
            <div className="text-lg flex items-center">
              <span>Student Name</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 opacity-70" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-lg flex items-center">
              <span>Level</span>
            </div>
            <div className="text-lg flex items-center">
              <span>Email</span>
            </div>
            <div className="text-lg flex items-center justify-end">
              <span>Actions</span>
            </div>
          </div>

          {/* Table Rows */}
          {filteredStudents.length > 0 ? (
            filteredStudents.map((student, index) => (
              <div
                key={student._id}
                className={`grid grid-cols-4 px-6 py-5 transition-all duration-200 hover:bg-indigo-50 ${index !== filteredStudents.length - 1 ? 'border-b border-indigo-100' : ''}`}
              >
                <div className="font-medium text-indigo-900 text-lg flex items-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xl mr-4 shadow-md">
                    {student?.userDetails?.fullName.charAt(0)}
                  </div>
                  <div>
                    <div className="font-semibold">{student?.userDetails?.fullName}</div>
                    {/* <div className="text-sm text-indigo-600 font-normal">ID: {student._id.substring(0, 8)}...</div> */}
                  </div>
                </div>
                <div className="text-gray-700 text-lg flex items-center">
                  <span className={`px-4 py-1.5 rounded-full text-sm font-semibold ${
                    student.level === "11" 
                      ? "bg-blue-100 text-blue-800" 
                      : student.level === "12" 
                      ? "bg-purple-100 text-purple-800" 
                      : "bg-indigo-100 text-indigo-800"
                  }`}>
                    Level {student.level}
                  </span>
                </div>
                <div className="text-gray-700 text-lg flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <span className="truncate">{student?.userDetails?.email}</span>
                </div>
                <div className="flex items-center justify-end space-x-2">
                  <button className="p-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button className="p-2 rounded-lg bg-indigo-100 text-indigo-700 hover:bg-indigo-200 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700">
                {students.length === 0 
                  ? "No students found" 
                  : `No students found in Level ${levelFilter}`}
              </h3>
              <p className="text-gray-500 mt-1">
                {students.length === 0 
                  ? "There are no students registered in this faculty yet." 
                  : "Try selecting a different filter."}
              </p>
            </div>
          )}
        </div>

        {/* Footer Note */}
        <div className="mt-8 text-center text-indigo-700 text-sm">
          <p>Only showing students from {faculty || "selected faculty"}. Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
    </>
  )
}

export default Student