import React, { useEffect, useState } from "react";
import { FaBook, FaQuestionCircle, FaClock, FaPlay, FaSearch, FaFilter, FaChevronRight, FaGraduationCap } from "react-icons/fa";
import { getQuizForStudentApi } from "../api/quiz.api";
import { useNavigate } from "react-router-dom";

const UserQuizzes = ({ level, faculty }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [groupedQuizzes, setGroupedQuizzes] = useState({});
  const [filteredGroupedQuizzes, setFilteredGroupedQuizzes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [expandedSubject, setExpandedSubject] = useState(null);
  const navigate = useNavigate();

  // Fetch quizzes from API
  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getQuizForStudentApi(level, faculty);
        const quizList = response?.user || [];
        setQuizzes(quizList);
        groupQuizzesBySubject(quizList);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to load quizzes. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (faculty && level) {
      fetchQuizzes();
    }
  }, [faculty, level]);

  // Group quizzes by subject
  const groupQuizzesBySubject = (quizList) => {
    const grouped = {};
    
    quizList.forEach(quiz => {
      const subject = quiz.subject || "Other";
      
      if (!grouped[subject]) {
        grouped[subject] = [];
      }
      
      grouped[subject].push(quiz);
    });
    
    setGroupedQuizzes(grouped);
    setFilteredGroupedQuizzes(grouped);
  };

  // Filter and sort quizzes
  useEffect(() => {
    if (Object.keys(groupedQuizzes).length === 0) return;

    let filteredGroups = { ...groupedQuizzes };

    // Apply search filter
    if (searchTerm) {
      filteredGroups = {};
      Object.keys(groupedQuizzes).forEach(subject => {
        const filteredQuizzes = groupedQuizzes[subject].filter(
          (quiz) =>
            quiz.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            subject.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        if (filteredQuizzes.length > 0) {
          filteredGroups[subject] = filteredQuizzes;
        }
      });
    }

    // Apply sorting to each subject's quizzes
    Object.keys(filteredGroups).forEach(subject => {
      filteredGroups[subject] = [...filteredGroups[subject]].sort((a, b) => {
        switch (sortBy) {
          case "newest":
            return new Date(b.createdAt) - new Date(a.createdAt);
          case "oldest":
            return new Date(a.createdAt) - new Date(b.createdAt);
          case "title":
            return (a.title || "").localeCompare(b.title || "");
          case "mostQuestions":
            return (b.questions?.length || 0) - (a.questions?.length || 0);
          case "leastQuestions":
            return (a.questions?.length || 0) - (b.questions?.length || 0);
          default:
            return 0;
        }
      });
    });

    setFilteredGroupedQuizzes(filteredGroups);
  }, [groupedQuizzes, searchTerm, sortBy]);

  // Toggle subject expansion
  const toggleSubject = (subject) => {
    setExpandedSubject(expandedSubject === subject ? null : subject);
  };

  // Format date safely
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate total quiz count
  const getTotalQuizCount = () => {
    return Object.values(filteredGroupedQuizzes).reduce(
      (total, quizzes) => total + quizzes.length, 0
    );
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quizzes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center p-6 bg-white rounded-lg shadow-md max-w-md">
          <div className="text-red-500 text-4xl mb-4">⚠️</div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Quizzes</h3>
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
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header & Search/Filter */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Available Quizzes</h1>
          <p className="text-gray-600 mb-6">
            For {faculty} students at level {level}
          </p>

          {/* Search and Filter Section */}
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search quizzes by title or subject..."
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="flex items-center gap-2">
              <FaFilter className="text-gray-400" />
              <select
                className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="title">Title (A-Z)</option>
                <option value="mostQuestions">Most Questions</option>
                <option value="leastQuestions">Least Questions</option>
              </select>
            </div>
          </div>

          {/* Results Count */}
          <p className="text-sm text-gray-600">
            Showing {getTotalQuizCount()} quizzes in {Object.keys(filteredGroupedQuizzes).length} subjects
          </p>
        </div>

        {/* Subject Cards */}
        {Object.keys(filteredGroupedQuizzes).length === 0 ? (
          <div className="bg-white rounded-xl shadow-md p-8 text-center">
            <div className="text-5xl mb-4">📚</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {searchTerm ? "No subjects match your search" : "No quizzes available"}
            </h3>
            <p className="text-gray-600">
              {searchTerm
                ? "Try adjusting your search terms or filters."
                : "Check back later for new quizzes in your faculty and level."}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Subjects</h2>
            <p className="text-gray-600 mb-4">Click on a subject to view its quizzes</p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.keys(filteredGroupedQuizzes).map((subject) => {
                const subjectQuizzes = filteredGroupedQuizzes[subject];
                const isExpanded = expandedSubject === subject;
                
                return (
                  <div 
                    key={subject} 
                    className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'}`}
                  >
                    {/* Subject Card Header */}
                    <div 
                      className="p-5 cursor-pointer"
                      onClick={() => toggleSubject(subject)}
                    >
                      <div className="flex justify-between items-center mb-3">
                        <div className="bg-blue-100 p-2 rounded-lg">
                          <FaBook className="text-blue-600 text-xl" />
                        </div>
                        <FaChevronRight className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                      </div>
                      
                      <h3 className="font-semibold text-lg text-gray-800 mb-2">{subject}</h3>
                      
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <FaGraduationCap className="mr-2" />
                        <span>Level: {level}</span>
                      </div>
                      
                      <div className="bg-gray-100 rounded-full px-3 py-1 text-sm text-gray-700">
                        {subjectQuizzes.length} quiz{subjectQuizzes.length !== 1 ? 'zes' : ''}
                      </div>
                    </div>
                    
                    {/* Quizzes List (shown when expanded) */}
                    {isExpanded && (
                      <div className="border-t p-5 bg-gray-50 animate-fadeIn">
                        <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                          <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                          Quizzes in {subject}
                        </h4>
                        
                        <div className="space-y-4">
                          {subjectQuizzes.map((quiz) => (
                            <div
                              key={quiz._id}
                              className="bg-white border rounded-lg p-4 hover:border-blue-300 transition-colors"
                            >
                              <h5 className="font-medium text-gray-800">{quiz.title}</h5>
                              <div className="flex items-center text-sm text-gray-600 mt-2">
                                <FaQuestionCircle className="mr-1" />
                                <span>{quiz.questions?.length || 0} questions</span>
                                <span className="mx-2">•</span>
                                <FaClock className="mr-1" />
                                <span>Created: {formatDate(quiz.createdAt)}</span>
                              </div>

                              <button
                                className="mt-3 w-full bg-green-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-green-600 transition text-sm font-medium"
                                onClick={() => navigate(`/user/studentplayquiz/${quiz._id}`)}
                              >
                                <FaPlay /> Start Quiz
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQuizzes;