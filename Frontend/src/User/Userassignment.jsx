import React, { useEffect, useState } from "react";
import {
  FaClock,
  FaBook,
  FaDownload,
  FaTimes,
  FaCheckCircle,
  FaExclamationTriangle,
  FaPaperPlane,
  FaChevronRight,
  FaChevronDown,
  FaSearch,
} from "react-icons/fa";
import { getAssignmentsForStudentApi } from "../api/assignment.api";
import { submitAssignmentApi } from "../api/Submit";
import UserSubmission from "./UserSubmission";

const Userassignment = ({ level, faculty, studentId }) => {
  const [assignmentsByCourse, setAssignmentsByCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [activeFilter, setActiveFilter] = useState("all");
  const [expandedCourses, setExpandedCourses] = useState({});
  const [submissionModal, setSubmissionModal] = useState({ isOpen: false, assignment: null });
  const [submissionFile, setSubmissionFile] = useState(null);
  const [submissionText, setSubmissionText] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Fetch assignments
  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const res = await getAssignmentsForStudentApi(level, faculty);
        if (res?.user) {
          const grouped = res.user.reduce((acc, assignment) => {
            const course = assignment.courseId || {};
            const courseKey = course._id || "unknown";

            if (!acc[courseKey]) {
              acc[courseKey] = {
                courseId: course._id || courseKey,
                courseName: course.subject || course.name || "Untitled Course",
                assignments: [],
              };
            }

            const dueDate = assignment.dueDate;
            const daysUntilDue = dueDate ? getDaysUntilDue(dueDate) : Infinity;
            let status = "pending";
            if (assignment.submissionDate) status = "submitted";
            else if (daysUntilDue < 0) status = "overdue";
            else if (daysUntilDue <= 2) status = "urgent";

            acc[courseKey].assignments.push({
              id: assignment._id,
              title: assignment.title,
              description: assignment.description,
              dueDate,
              submissionDate: assignment.submissionDate,
              submittedFile: assignment.submittedFile,
              status,
              teacherId: assignment.teacherId,
              daysUntilDue,
            });

            return acc;
          }, {});

          const normalized = Object.values(grouped);
          setAssignmentsByCourse(normalized);
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load assignments");
      } finally {
        setLoading(false);
      }
    };

    fetchAssignments();
  }, [level, faculty]);

  const getDaysUntilDue = (dueDate) => {
    if (!dueDate) return Infinity;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const due = new Date(dueDate);
    due.setHours(0, 0, 0, 0);
    return Math.ceil((due - today) / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status, daysUntilDue) => {
    switch (status) {
      case "submitted":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
            <FaCheckCircle className="mr-1" /> Submitted
          </span>
        );
      case "overdue":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800">
            <FaExclamationTriangle className="mr-1" /> Overdue
          </span>
        );
      case "urgent":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800">
            <FaExclamationTriangle className="mr-1" /> Due in {daysUntilDue} day
            {daysUntilDue === 1 ? "" : "s"}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-800">
            Pending
          </span>
        );
    }
  };

  const toggleCourseExpansion = (courseId) => {
    setExpandedCourses((prev) => ({ ...prev, [courseId]: !prev[courseId] }));
  };

  const filteredCourses = assignmentsByCourse
    .filter((course) => course.courseName.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((course) =>
      activeFilter === "all" ? true : course.assignments.some((a) => a.status === activeFilter)
    )
    .sort((a, b) =>
      sortBy === "assignments" ? b.assignments.length - a.assignments.length : a.courseName.localeCompare(b.courseName)
    );

  const handleFileChange = (e) => setSubmissionFile(e.target.files[0]);

  const handleSubmitAssignment = async (e) => {
    e.preventDefault();
    if (!submissionFile && !submissionText) return alert("Please upload a file or enter text");

    try {
      setSubmitting(true);
      const formData = new FormData();
      formData.append("assignmentId", submissionModal.assignment.id);
      formData.append("teacherId", submissionModal.assignment.teacherId);
      formData.append("studentId", studentId);
      if (submissionText) formData.append("answer", submissionText);
      if (submissionFile) formData.append("file", submissionFile);

      await submitAssignmentApi(formData);

      // Update local state
      const updatedAssignmentsByCourse = assignmentsByCourse.map((course) => {
        if (course.courseId === submissionModal.assignment.courseId) {
          const updatedAssignments = course.assignments.map((assignment) =>
            assignment.id === submissionModal.assignment.id
              ? {
                  ...assignment,
                  status: "submitted",
                  submissionDate: new Date().toISOString().split("T")[0],
                  submittedFile: submissionFile ? submissionFile.name : "text_submission.txt",
                }
              : assignment
          );
          return { ...course, assignments: updatedAssignments };
        }
        return course;
      });

      setAssignmentsByCourse(updatedAssignmentsByCourse);
      setSubmissionModal({ isOpen: false, assignment: null });
      setSubmissionFile(null);
      setSubmissionText("");
      alert("Assignment submitted successfully!");
    } catch (error) {
      console.error("Submit assignment error:", error);
      alert("Failed to submit assignment. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const openSubmissionModal = (assignment, course) => {
    setSubmissionModal({
      isOpen: true,
      assignment: { ...assignment, courseId: course.courseId, courseName: course.courseName, teacherId: assignment.teacherId },
    });
  };

  if (loading) return <div className="min-h-screen flex justify-center items-center">Loading...</div>;
  if (error) return <div className="min-h-screen flex justify-center items-center text-red-500">{error}</div>;

  return (
    <div className="min-h-screen p-4 md:p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">My Assignments</h1>
          <p className="text-gray-600">View and manage all your course assignments</p>
        </header>

        {/* Controls */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search courses..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="default">Sort by: Default</option>
              <option value="assignments">Sort by: Assignments Count</option>
            </select>

            <select
              value={activeFilter}
              onChange={(e) => setActiveFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Assignments</option>
              <option value="submitted">Submitted</option>
              <option value="pending">Pending</option>
              <option value="urgent">Urgent</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
        </div>

        {/* Course List */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white p-8 rounded-lg shadow-sm text-center text-gray-500">No assignments found</div>
        ) : (
          <div className="space-y-4">
            {filteredCourses.map((course) => (
              <div key={course.courseId} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <div
                  className="p-4 border-b border-gray-100 flex justify-between items-center cursor-pointer hover:bg-gray-50 transition-colors"
                  onClick={() => toggleCourseExpansion(course.courseId)}
                >
                  <div className="flex items-center">
                    <div className="mr-3 text-blue-600">
                      {expandedCourses[course.courseId] ? <FaChevronDown /> : <FaChevronRight />}
                    </div>
                    <div>
                      <h2 className="font-semibold text-lg">{course.courseName}</h2>
                      <p className="text-sm text-gray-500">
                        {course.assignments.length} assignment{course.assignments.length !== 1 ? 's' : ''}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {course.assignments.some(a => a.status === "urgent") && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                        Urgent
                      </span>
                    )}
                    {course.assignments.some(a => a.status === "overdue") && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        Overdue
                      </span>
                    )}
                  </div>
                </div>

                {expandedCourses[course.courseId] && (
                  <div className="p-4 bg-gray-50 space-y-4">
                    {course.assignments.length === 0 ? (
                      <div className="text-center py-4 text-gray-500">
                        No assignments in this course match your filters
                      </div>
                    ) : (
                      course.assignments.map((assignment) => (
                        <div key={assignment.id} className="bg-white p-4 rounded-md border border-gray-200 shadow-sm">
                          <div className="flex justify-between items-start mb-3">
                            <h3 className="font-semibold text-gray-800">{assignment.title}</h3>
                            {getStatusBadge(assignment.status, assignment.daysUntilDue)}
                          </div>
                          <p className="text-gray-600 mb-4">{assignment.description}</p>
                          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                            <div className="text-sm text-gray-500">
                              Due: {assignment.dueDate ? new Date(assignment.dueDate).toLocaleDateString() : 'No due date'}
                            </div>
                            {assignment.status !== "submitted" ? (
                              <button
                                onClick={() => openSubmissionModal(assignment, course)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                              >
                                <FaPaperPlane className="mr-2" /> Submit
                              </button>
                            ) : (
                              <div className="text-sm text-green-600">
                                Submitted on: {new Date(assignment.submissionDate).toLocaleDateString()}
                              </div>
                            )}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Submission Modal */}
        {submissionModal.isOpen && submissionModal.assignment && (
          <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg max-w-md w-full p-6 relative">
              <button
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
                onClick={() => setSubmissionModal({ isOpen: false, assignment: null })}
              >
                <FaTimes />
              </button>
              <h2 className="text-xl font-bold mb-2">Submit Assignment</h2>
              <div className="mb-6 p-4 bg-blue-50 rounded-md">
                <p className="font-medium">{submissionModal.assignment.courseName}</p>
                <p className="text-gray-700">{submissionModal.assignment.title}</p>
              </div>
              <form onSubmit={handleSubmitAssignment}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload File</label>
                  <input
                    key={submissionFile ? submissionFile.name : "file-input"}
                    type="file"
                    onChange={handleFileChange}
                    className="w-full border border-gray-300 rounded-md p-2"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Or enter text submission</label>
                  <textarea
                    rows="4"
                    placeholder="Type your assignment response here..."
                    value={submissionText}
                    onChange={(e) => setSubmissionText(e.target.value)}
                    className="w-full border border-gray-300 rounded-md p-3"
                  />
                </div>
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors flex items-center justify-center"
                >
                  <FaPaperPlane className="mr-2" /> {submitting ? "Submitting..." : "Submit Assignment"}
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
      <div>
        <UserSubmission studentId={studentId}/>
      </div>
    </div>
  );
};

export default Userassignment;