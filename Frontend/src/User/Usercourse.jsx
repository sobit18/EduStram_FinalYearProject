import React, { useEffect, useState } from "react";
import { FaClock, FaBook, FaDownload, FaTimes, FaEye, FaSearch, FaFilter, FaStar, FaUserGraduate, FaChartLine } from "react-icons/fa";
import { getCoursesForStudentApi } from "../api/course.api";
import { getContentsForStudentApi } from "../api/content.api";

function Usercourse({ level, faculty }) {
  const [courses, setCourses] = useState([]);
  const [contents, setContents] = useState([]);
  const [coursesLoading, setCoursesLoading] = useState(true);
  const [contentsLoading, setContentsLoading] = useState(true);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [selectedPdf, setSelectedPdf] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("default");
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        setCoursesLoading(true);
        setContentsLoading(true);

        // Fetch courses and contents in parallel for better performance
        const [courseRes, contentRes] = await Promise.all([
          getCoursesForStudentApi(level, faculty),
          getContentsForStudentApi(level, faculty)
        ]);

        if (courseRes?.user) {
          setCourses(courseRes.user);
        } else {
          throw new Error("Invalid course data format");
        }

        if (contentRes?.user) {
          setContents(contentRes.user);
        } else {
          throw new Error("Invalid content data format");
        }
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to load courses. Please try again later.");
      } finally {
        setCoursesLoading(false);
        setContentsLoading(false);
      }
    };

    fetchData();
  }, [level, faculty]);

  // Function to handle PDF download
  const handleDownloadPdf = (pdfPath, fileName) => {
    const link = document.createElement('a');
    link.href = pdfPath;
    link.download = fileName || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Map content _id => content object
  const contentById = {};
  contents.forEach((c) => {
    contentById[c._id] = c;
  });

  // Map courses to their full content objects
  const coursesWithContents = courses.map((course) => {
    const courseContents = (course.contents || [])
      .map((id) => contentById[id])
      .filter(Boolean);
    
    const duration = courseContents.reduce((sum, c) => sum + (c.teachinghours || 0), 0);
    const chapters = courseContents.length;
    const progress = Math.floor(Math.random() * 100); // Simulated progress
    
    return { 
      ...course, 
      courseContents,
      duration,
      chapters,
      progress,
      rating: (4 + Math.random()).toFixed(1) // Simulated rating
    };
  });

  // Filter and sort courses
  const filteredCourses = coursesWithContents
    .filter(course => 
      course.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      course.faculty.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "duration") return b.duration - a.duration;
      if (sortBy === "chapters") return b.chapters - a.chapters;
      if (sortBy === "rating") return b.rating - a.rating;
      return a.subject.localeCompare(b.subject);
    });

  const loading = coursesLoading || contentsLoading;

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center items-center p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <h2 className="mt-6 text-xl font-semibold text-gray-800">Loading Your Courses</h2>
          <p className="mt-2 text-gray-600">We're gathering all the learning materials for you</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 flex flex-col justify-center items-center p-6">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full">
          <div className="flex flex-col items-center text-center">
            <div className="rounded-full bg-red-100 p-4 mb-4">
              <svg className="w-12 h-12 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Something went wrong</h3>
            <p className="text-gray-600 mb-6">{error}</p>
            <button 
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Course Catalog
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover and explore all available courses tailored for your academic program
          </p>
          
          <div className="mt-6 bg-white/80 backdrop-blur-sm rounded-2xl p-4 shadow-sm inline-flex flex-col md:flex-row items-center gap-4">
            <div className="flex items-center">
              <div className="bg-blue-100 p-2 rounded-lg">
                <FaUserGraduate className="text-blue-600 text-xl" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Faculty</p>
                <p className="font-semibold text-gray-800">{faculty}</p>
              </div>
            </div>
            
            <div className="hidden md:block h-8 w-px bg-gray-300"></div>
            
            <div className="flex items-center">
              <div className="bg-purple-100 p-2 rounded-lg">
                <FaChartLine className="text-purple-600 text-xl" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-gray-500">Level</p>
                <p className="font-semibold text-gray-800">{level}</p>
              </div>
            </div>
          </div>
        </header>

        {/* Search and Filter Section */}
        <div className="bg-white rounded-2xl p-6 shadow-sm mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="relative flex-1 max-w-2xl">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search courses by name or faculty..."
                className="pl-10 pr-4 py-3 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-500" />
              <select 
                className="border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="default">Sort by</option>
                <option value="duration">Duration</option>
                <option value="chapters">Chapters</option>
                <option value="rating">Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
            <div className="max-w-md mx-auto">
              <div className="bg-blue-100 p-4 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                <FaSearch className="text-blue-600 text-2xl" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">No courses found</h3>
              <p className="text-gray-600 mb-6">
                We couldn't find any courses matching your search. Try adjusting your filters or search term.
              </p>
              <button 
                onClick={() => {
                  setSearchTerm("");
                  setSortBy("default");
                }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
              >
                Clear Filters
              </button>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {filteredCourses.map((course) => (
              <div
                key={course._id}
                className="bg-white rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-2 cursor-pointer border border-gray-100"
                onClick={() => setSelectedCourse(course._id)}
              >
                <div className="relative">
                  <div className="h-2 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                  
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {course.faculty}
                      </span>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        Level {course.level}
                      </span>
                    </div>

                    <h2 className="text-xl font-semibold text-gray-800 mb-3 line-clamp-2">
                      {course.subject}
                    </h2>

                    <div className="flex items-center text-sm text-gray-500 mb-4">
                      <FaClock className="mr-1" /> {course.duration} hours
                      <FaBook className="ml-3 mr-1" /> {course.chapters} chapters
                    </div>
                    
                    {/* <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center">
                        <div className="flex text-yellow-400">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <FaStar 
                              key={star} 
                              className={star <= Math.floor(course.rating) ? "fill-current" : "text-gray-300"} 
                            />
                          ))}
                        </div>
                        <span className="ml-2 text-sm text-gray-600">{course.rating}</span>
                      </div>
                    </div> */}
                    
                    {/* <div className="bg-gray-100 rounded-full h-2 mb-4 overflow-hidden">
                      <div 
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div> */}
                    {/* <div className="text-xs text-gray-500 text-center">
                      {course.progress}% completed
                    </div> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Course Detail Modal */}
        {selectedCourse && filteredCourses.find((c) => c._id === selectedCourse) && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-70 z-50 overflow-auto p-4 md:p-8 flex items-center justify-center"
            onClick={() => setSelectedCourse(null)}
          >
            <div 
              className="bg-white rounded-2xl max-w-4xl w-full mx-auto p-6 relative max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="absolute top-6 right-6 text-gray-500 hover:text-gray-700 transition-colors bg-gray-100 rounded-full p-2 z-10"
                onClick={() => setSelectedCourse(null)}
                aria-label="Close course details"
              >
                <FaTimes />
              </button>

              {(() => {
                const course = filteredCourses.find((c) => c._id === selectedCourse);
                const { courseContents } = course;

                return (
                  <>
                    <div className="mb-6 pb-6 border-b border-gray-200">
                      <h2 className="text-3xl font-bold text-gray-800 mb-4">
                        {course.subject}
                      </h2>

                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                          Level {course.level}
                        </span>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                          {course.faculty}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-blue-600">{course.duration}</div>
                          <div className="text-sm text-blue-800">Total hours</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-purple-600">{course.chapters}</div>
                          <div className="text-sm text-purple-800">Chapters</div>
                        </div>
                        {/* <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">{course.rating}</div>
                          <div className="text-sm text-green-800">Course rating</div>
                        </div> */}
                        {/* <div className="bg-orange-50 p-4 rounded-lg">
                          <div className="text-2xl font-bold text-orange-600">{course.progress}%</div>
                          <div className="text-sm text-orange-800">Progress</div>
                        </div> */}
                      </div>
                    </div>

                    <h3 className="text-xl font-semibold text-gray-800 mb-6">
                      Course Content
                    </h3>
                    
                    {courseContents.length === 0 ? (
                      <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                        <FaBook className="text-4xl text-gray-300 mx-auto mb-4" />
                        <p>No content available for this course yet.</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {courseContents.map((content, index) => {
                          const pdfPath = `http://localhost:3000/uploads/${content.description}`;
                          
                          return (
                            <div
                              key={content._id}
                              className="border border-gray-200 rounded-xl p-5 hover:border-blue-300 transition-all duration-300 bg-white hover:shadow-md"
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center mb-2">
                                    <div className="bg-blue-100 text-blue-800 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm mr-3">
                                      {index + 1}
                                    </div>
                                    <h4 className="font-semibold text-gray-800 text-lg">
                                      {content.title}
                                    </h4>
                                  </div>
                                  <div className="flex gap-4 text-sm text-gray-600 mb-3 pl-11">
                                    <span className="flex items-center">
                                      <FaBook className="mr-1" /> Chapter {content.chapter}
                                    </span>
                                    <span className="flex items-center">
                                      <FaClock className="mr-1" /> {content.teachinghours} hours
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {content.description && (
                                <div className="flex gap-3 mt-4 pl-11">
                                  <button
                                    onClick={() => window.open(pdfPath, '_blank')}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-md"
                                  >
                                    <FaEye className="mr-2" />
                                    View PDF
                                  </button>
                                  <button
                                    onClick={() => handleDownloadPdf(pdfPath, content.title)}
                                    className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-600 to-gray-700 text-white text-sm font-medium rounded-lg hover:from-gray-700 hover:to-gray-800 transition-all shadow-md"
                                  >
                                    <FaDownload className="mr-2" />
                                    Download
                                  </button>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                );
              })()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Usercourse;