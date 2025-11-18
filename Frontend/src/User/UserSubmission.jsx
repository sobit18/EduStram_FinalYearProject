import React, { useEffect, useState } from "react";
import { getSubmissionsApi } from "../api/Submit";
import {
  FaFileAlt,
  FaChevronDown,
  FaChevronRight,
  FaCheckCircle,
  FaClock,
  FaTimesCircle,
} from "react-icons/fa";

const UserSubmission = ({ studentId }) => {
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showSubmissions, setShowSubmissions] = useState(false);
  const [expandedSubmission, setExpandedSubmission] = useState(null);

  useEffect(() => {
    if (showSubmissions) {
      const fetchSubmissions = async () => {
        try {
          setLoading(true);
          const res = await getSubmissionsApi(studentId);
          setSubmissions(res?.user || []);
        } catch (err) {
          console.error(err);
          setError("Failed to load submissions");
        } finally {
          setLoading(false);
        }
      };
      fetchSubmissions();
    }
  }, [studentId, showSubmissions]);

  const toggleSubmissions = () => {
    setShowSubmissions(!showSubmissions);
    if (!showSubmissions) {
      setExpandedSubmission(null);
    }
  };

  const toggleSubmissionExpansion = (id) => {
    setExpandedSubmission(expandedSubmission === id ? null : id);
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "graded":
        return <FaCheckCircle className="text-green-500 mr-1" />;
      case "submitted":
        return <FaClock className="text-blue-500 mr-1" />;
      default:
        return <FaTimesCircle className="text-yellow-500 mr-1" />;
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "graded":
        return "Graded";
      case "submitted":
        return "Submitted";
      default:
        return "Pending Review";
    }
  };

  if (loading)
    return (
      <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
        <div className="animate-pulse">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          {[1, 2].map((n) => (
            <div key={n} className="p-3 border rounded-lg mb-3">
              <div className="h-5 bg-gray-200 rounded w-2/3 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          ))}
        </div>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
        <div className="flex items-center">
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <span>{error}</span>
        </div>
      </div>
    );

  return (
    <div className="bg-white rounded-lg shadow-sm mb-6 overflow-hidden">
      <button
        onClick={toggleSubmissions}
        className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition-colors duration-200"
      >
        <div className="flex items-center">
          <FaFileAlt className="text-indigo-600 mr-3" />
          <h2 className="text-lg font-semibold text-gray-800">
            My Submitted Assignments
          </h2>
          <span className="ml-3 bg-indigo-100 text-indigo-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
            {submissions.length}
          </span>
        </div>
        {showSubmissions ? <FaChevronDown /> : <FaChevronRight />}
      </button>

      {showSubmissions && (
        <div className="p-4 border-t">
          {submissions.length === 0 ? (
            <div className="text-center py-8 bg-gray-50 rounded-lg">
              <FaFileAlt className="w-12 h-12 mx-auto text-gray-400 mb-3" />
              <h3 className="text-lg font-medium text-gray-900 mb-1">
                No submissions yet
              </h3>
              <p className="text-gray-500">
                Your submitted assignments will appear here.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {submissions.map((sub) => (
                <div key={sub._id} className="border rounded-lg overflow-hidden">
                  <div
                    className="p-3 bg-gray-50 hover:bg-gray-100 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleSubmissionExpansion(sub._id)}
                  >
                    <div className="flex items-center">
                      <span className="mr-3">
                        {expandedSubmission === sub._id ? (
                          <FaChevronDown />
                        ) : (
                          <FaChevronRight />
                        )}
                      </span>
                      <h3 className="font-medium text-gray-800">
                        {sub.assignmentId?.title || "Untitled Assignment"}
                      </h3>
                    </div>
                    <div className="flex items-center">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          sub.status === "graded"
                            ? "bg-green-100 text-green-800"
                            : sub.status === "submitted"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        <span className="flex items-center">
                          {getStatusIcon(sub.status)}
                          {getStatusText(sub.status)}
                        </span>
                      </span>
                    </div>
                  </div>

                  {expandedSubmission === sub._id && (
                    <div className="p-4 bg-white border-t space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <span className="font-semibold mr-1">Submitted:</span>
                          <span>
                            {new Date(sub.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-center">
                          <span className="font-semibold mr-1">Teacher:</span>
                          <span>
                            {sub.teacherId?.userId?.fullName || "Not specified"}
                          </span>
                        </div>
                      </div>

                      {sub.answer && (
                        <div className="mt-3 p-3 bg-gray-50 rounded-md">
                          <p className="text-sm text-gray-700">{sub.answer}</p>
                        </div>
                      )}

                      {sub.fileUrl && (
                        <div className="mt-4">
                          <a
                            href={`http://localhost:3000/${sub.fileUrl.replace(
                              /\\/g,
                              "/"
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                          >
                            View Submitted File
                          </a>
                        </div>
                      )}

                      {/* Grade and Feedback (Read-only) */}
                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-semibold">Grade: </span>
                          <span>{sub.grade || "Not graded"}</span>
                        </div>
                        <div>
                          <span className="font-semibold">Feedback: </span>
                          <span>{sub.feedback || "No feedback"}</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default UserSubmission;
