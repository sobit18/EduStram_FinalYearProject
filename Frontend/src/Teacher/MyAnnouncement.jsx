import React, { useState, useEffect } from "react";
import { getAnnouncementApi } from "../api/announcement";
// import { getAnnouncementApi } from "../api/announcement.api"; // your API call
getAnnouncementApi

function MyAnnouncement({ teacherId }) {
  const [announcements, setAnnouncements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        setLoading(true);
        const response = await getAnnouncementApi(teacherId);
        console.log("Announcement details are", response);
        setAnnouncements(response?.user || []); // adjust if response structure differs
      } catch (err) {
        console.error("Failed to fetch announcements", err);
        setError("Failed to load announcements.");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [teacherId]);

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Group announcements by course
  const groupedAnnouncements = announcements.reduce((acc, announcement) => {
    const courseId = announcement.courseId?._id || "unknown";
    if (!acc[courseId])
      acc[courseId] = { course: announcement.courseId, announcements: [] };
    acc[courseId].announcements.push(announcement);
    return acc;
  }, {});

  if (loading)
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-3 text-gray-600">Loading your announcements...</span>
      </div>
    );

  if (error)
    return (
      <div className="bg-red-50 p-4 rounded-lg max-w-md mx-auto mt-8">
        <div className="flex items-center">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <p className="text-sm text-red-700 mt-1">{error}</p>
          </div>
        </div>
      </div>
    );

  if (announcements.length === 0)
    return (
      <div className="bg-white rounded-xl shadow-sm p-8 max-w-2xl mx-auto mt-8 text-center">
        <svg
          className="w-16 h-16 mx-auto text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
          ></path>
        </svg>
        <h3 className="mt-4 text-lg font-medium text-gray-900">
          No announcements found
        </h3>
        <p className="mt-2 text-gray-500">
          You haven't created any announcements yet.
        </p>
      </div>
    );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">
        Announcements for Students
      </h1>

      <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {Object.values(groupedAnnouncements).map(({ course, announcements }) => (
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

              <div className="flex items-center text-sm text-gray-500">
                <span>{announcements.length} announcements</span>
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
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            {groupedAnnouncements[selectedCourse] && (
              <>
                <div className="mb-6 pb-4 border-b border-gray-200">
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    {groupedAnnouncements[selectedCourse].course?.subject}{" "}
                    Announcements
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                      Level {groupedAnnouncements[selectedCourse].course?.level}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                      {groupedAnnouncements[selectedCourse].course?.faculty}
                    </span>
                  </div>
                </div>

                <div className="space-y-4">
                  {groupedAnnouncements[selectedCourse].announcements.map(
                    (announcement) => (
                      <div
                        key={announcement._id}
                        className="border border-gray-200 rounded-lg p-4 hover:border-blue-300 transition-colors bg-gray-50 hover:bg-white"
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-semibold text-gray-800">
                            {announcement.title}
                          </h4>
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                            {formatDate(announcement.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-3 text-sm">
                          {announcement.announcement}
                        </p>
                      </div>
                    )
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAnnouncement;
