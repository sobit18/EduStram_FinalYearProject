import React, { useState } from "react";
import { getSubmissionsByTeacherIdApi, updateSubmissionApi } from "../api/Submit";

const StudentSubmit = ({ teacherId }) => {
  const [showTable, setShowTable] = useState(false);
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSubmissions = async () => {
    try {
      setLoading(true);
      const data = await getSubmissionsByTeacherIdApi(teacherId);
      // Add local fields for editing
      const mapped = (data.user || []).map((sub) => ({
        ...sub,
        localGrade: sub.grade || "",
        localFeedback: sub.feedback || "",
      }));
      setSubmissions(mapped);
    } catch (error) {
      console.error("Error fetching submissions:", error);
      setSubmissions([]);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = () => {
    if (!showTable) fetchSubmissions();
    setShowTable(!showTable);
  };

  const handleUpdate = async (submissionId, grade, feedback) => {
    try {
      await updateSubmissionApi(submissionId, grade, feedback);
      alert("Submission updated successfully!");
      setSubmissions((prev) =>
        prev.map((sub) =>
          sub._id === submissionId
            ? { ...sub, grade, feedback, status: grade ? "graded" : sub.status }
            : sub
        )
      );
    } catch (error) {
      console.error("Error updating submission:", error);
      alert("Failed to update submission.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Student Submissions</h1>

      <button
        onClick={handleToggle}
        className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
      >
        {showTable ? "Hide Submissions" : "Show Submissions"}
      </button>

      {loading && <p className="mt-4 text-gray-600">Loading submissions...</p>}

      {showTable && submissions.length > 0 && (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full border border-gray-300 rounded-lg shadow-md">
            <thead className="bg-gray-200">
              <tr>
                <th className="border px-4 py-2">#</th>
                <th className="border px-4 py-2">Student Name</th>
                <th className="border px-4 py-2">Assignment Title</th>
                <th className="border px-4 py-2">File</th>
                <th className="border px-4 py-2">Status</th>
                <th className="border px-4 py-2">Grade</th>
                <th className="border px-4 py-2">Feedback</th>
                <th className="border px-4 py-2">Action</th>
                <th className="border px-4 py-2">Submitted At</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((sub, index) => (
                <tr key={sub._id} className="hover:bg-gray-100">
                  <td className="border px-4 py-2">{index + 1}</td>
                  <td className="border px-4 py-2">
                    {sub.studentId?.userId?.fullName || sub.studentId?._id || "Unknown Student"}
                  </td>
                  <td className="border px-4 py-2">
                    {sub.assignmentId?.title || sub.assignmentId?._id || "Unknown Assignment"}
                  </td>
                  <td className="border px-4 py-2">
                    {sub.fileUrl ? (
                      <a
                        href={`http://localhost:3000/${sub.fileUrl.replace(/\\/g, "/")}`}
                        target="_blank"
                        rel="noreferrer"
                        className="text-blue-600 underline"
                      >
                        View File
                      </a>
                    ) : (
                      "No file"
                    )}
                  </td>
                  <td
                    className={`border px-4 py-2 font-semibold ${
                      sub.status === "submitted"
                        ? "text-green-600"
                        : sub.status === "graded"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {sub.status}
                  </td>
                  <td className="border px-4 py-2">
                    <input
                      type="text"
                      value={sub.localGrade}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSubmissions((prev) =>
                          prev.map((s) => (s._id === sub._id ? { ...s, localGrade: value } : s))
                        );
                      }}
                      placeholder="Grade"
                      className="border px-2 py-1 w-20"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <textarea
                      type="text"
                      value={sub.localFeedback}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSubmissions((prev) =>
                          prev.map((s) => (s._id === sub._id ? { ...s, localFeedback: value } : s))
                        );
                      }}
                      placeholder="Feedback"
                      className="border px-2 py-1 w-40"
                    />
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleUpdate(sub._id, sub.localGrade, sub.localFeedback)}
                      className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                    >
                      Update
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    {sub.createdAt ? new Date(sub.createdAt).toLocaleString() : "N/A"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showTable && !loading && submissions.length === 0 && (
        <p className="mt-4 text-gray-600">No submissions found.</p>
      )}
    </div>
  );
};

export default StudentSubmit;
