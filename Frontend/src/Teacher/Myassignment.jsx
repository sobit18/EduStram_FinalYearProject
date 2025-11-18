import React, { useState, useEffect } from "react";
import { getAssignmentApi } from "../api/assignment.api";

function Myassignment({ teacherId }) {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        setLoading(true);
        const response = await getAssignmentApi(teacherId);
        console.log("Assignment details are", response);
        setAssignments(response?.user || []);
      } catch (err) {
        console.error("Failed to fetch assignments", err);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [teacherId]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group assignments by courseId
  const groupedAssignments = assignments.reduce((acc, assignment) => {
    const courseId = assignment.courseId?._id || "unknown";
    if (!acc[courseId]) acc[courseId] = { course: assignment.courseId, assignments: [] };
    acc[courseId].assignments.push(assignment);
    return acc;
  }, {});

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      <span className="ml-3 text-gray-600">Loading your assignments...</span>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 p-4 rounded-lg max-w-md mx-auto mt-8">
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-sm font-medium text-red-800">Error</h3>
          <p className="text-sm text-red-700 mt-1">{error}</p>
        </div>
      </div>
    </div>
  );

  if (assignments.length === 0) return (
    <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto mt-8 text-center">
      <svg className="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
      </svg>
      <h3 className="mt-4 text-lg font-medium text-gray-900">No assignments found</h3>
      <p className="mt-2 text-gray-500">You haven't created any assignments yet.</p>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Assignments for Students</h1>
      
      {/* Grid of course cards */}
      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(groupedAssignments).map(({ course, assignments }) => (
          <div
            key={course?._id || Math.random()}
            className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer border border-gray-100"
            onClick={() => setSelectedCourse(course?._id)}
          >
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                  {course?.faculty}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                  Level {course?.level}
                </span>
              </div>
              
              <h2 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2">
                {course?.subject}
              </h2>
              
              <div className="flex items-center text-sm text-gray-500 mb-4">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                </svg>
                <span>{assignments.length} assignments</span>
              </div>
              
              <div className="flex items-center text-sm text-gray-600">
                <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                </svg>
                {assignments.length > 0 && (
                  <span>Due: {formatDate(assignments[0].dueDate)}</span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Full-page overlay for selected course */}
      {selectedCourse && (
        <div className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-auto p-4 md:p-8 flex items-center justify-center">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-auto p-6 relative max-h-[90vh] overflow-y-auto">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 rounded-full p-1"
              onClick={() => setSelectedCourse(null)}
              aria-label="Close"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            </button>

            {groupedAssignments[selectedCourse] && (
              <>
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {groupedAssignments[selectedCourse].course?.subject} Assignments
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Level {groupedAssignments[selectedCourse].course?.level}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {groupedAssignments[selectedCourse].course?.faculty}
                    </span>
                  </div>
                </div>

                <h3 className="text-lg font-semibold text-gray-800 mb-4">Course Assignments</h3>
                
                <div className="space-y-4">
                  {groupedAssignments[selectedCourse].assignments.map((assignment) => (
                    <div
                      key={assignment._id}
                      className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors bg-gray-50 hover:bg-white"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-800">{assignment.title}</h4>
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                          Due: {formatDate(assignment.dueDate)}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap gap-3 text-sm text-gray-600 mb-3">
                        <span className="flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
                          </svg>
                          Chapter {assignment.chapter || "N/A"}
                        </span>
                      </div>
                      
                      <p className="text-gray-700 mb-3 text-sm">{assignment.description}</p>
                      
                      {assignment.attachment && (
                        <a
                          href={`http://localhost:3000/uploads/${assignment.attachment}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 transition-colors"
                          download={assignment.title}
                        >
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                          </svg>
                          Download Assignment
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Myassignment;