import React, { useEffect, useState } from "react";
import { FaBook, FaSearch, FaChevronRight, FaBullhorn, FaCalendar, FaChevronDown } from "react-icons/fa";
import { getAnnouncementsForStudentApi } from "../api/announcement";

const UserAnnouncement = ({ level, faculty }) => {
  const [announcementsByCourse, setAnnouncementsByCourse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expandedCourse, setExpandedCourse] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchAnnouncements = async () => {
      try {
        const res = await getAnnouncementsForStudentApi(level, faculty);
        if (res?.user) {
          // Group by course
          const grouped = res.user.reduce((acc, ann) => {
            const course = ann.courseId || {};
            const courseKey = course._id || "unknown";

            if (!acc[courseKey]) {
              acc[courseKey] = {
                courseId: course._id || courseKey,
                courseName: course.subject || course.name || "Untitled Course",
                announcements: [],
              };
            }

            acc[courseKey].announcements.push({
              id: ann._id,
              title: ann.title,
              description: ann.announcement,
              createdAt: ann.createdAt,
            });

            return acc;
          }, {});

          setAnnouncementsByCourse(Object.values(grouped));
        } else {
          setError("Invalid response format from server");
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load announcements");
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncements();
  }, [level, faculty]);

  const toggleCourseExpansion = (courseId) => {
    setExpandedCourse(expandedCourse === courseId ? null : courseId);
  };

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const filteredCourses = announcementsByCourse.filter((course) =>
    course.courseName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading announcements...</p>
        </div>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Announcements</h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Try Again
          </button>
        </div>
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header & Search */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <FaBullhorn className="text-blue-600 text-2xl" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Course Announcements</h1>
              <p className="text-gray-600">
                For {faculty} students at level {level}
              </p>
            </div>
          </div>

          {/* Search Section */}
          <div className="mb-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600">
            Showing {filteredCourses.length} course{filteredCourses.length !== 1 ? 's' : ''} with announcements
          </p>
        </div>

        {/* Course List */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-5xl mb-4">📢</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm ? "No courses match your search" : "No announcements available"}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms."
                : "Check back later for new announcements in your courses."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Courses</h2>
            <p className="text-gray-600 mb-4">Click on a course to view its announcements</p>
            
            {filteredCourses.map((course) => {
              const isExpanded = expandedCourse === course.courseId;
              
              return (
                <div 
                  key={course.courseId} 
                  className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                >
                  {/* Course Header - Full Width */}
                  <div 
                    className="p-5 cursor-pointer flex justify-between items-center"
                    onClick={() => toggleCourseExpansion(course.courseId)}
                  >
                    <div className="flex items-center">
                      <div className="bg-blue-100 p-3 rounded-lg mr-4">
                        <FaBook className="text-blue-600 text-xl" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-800">{course.courseName}</h3>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <FaBullhorn className="mr-2" />
                          <span>{course.announcements.length} announcement{course.announcements.length !== 1 ? 's' : ''}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-3">
                        {isExpanded ? 'Collapse' : 'Expand'}
                      </span>
                      {isExpanded ? (
                        <FaChevronDown className="text-gray-400" />
                      ) : (
                        <FaChevronRight className="text-gray-400" />
                      )}
                    </div>
                  </div>
                  
                  {/* Announcements List (shown when expanded) */}
                  {isExpanded && (
                    <div className="border-t p-5 bg-gray-50 animate-fadeIn">
                      <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                        <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                        Announcements for {course.courseName}
                      </h4>
                      
                      <div className="space-y-4">
                        {course.announcements.map((ann) => (
                          <div
                            key={ann.id}
                            className="bg-white border rounded-lg p-4 hover:border-blue-300 transition-colors"
                          >
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-800">{ann.title}</h5>
                              <span className="text-xs text-gray-500 flex items-center">
                                <FaCalendar className="mr-1" />
                                {formatDate(ann.createdAt)}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{ann.description}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default UserAnnouncement;