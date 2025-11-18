import React, { useEffect, useState } from "react";
import { FaBook, FaQuestionCircle, FaClock, FaPlay, FaChevronRight, FaGraduationCap } from "react-icons/fa";
import { getQuizApi } from "../api/quiz.api";
import { useNavigate } from "react-router-dom";

const TeacherQuiz = ({ teacherId }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [groupedQuizzes, setGroupedQuizzes] = useState({});
  const [expandedGroup, setExpandedGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const data = await getQuizApi(teacherId);
        if (data.user) {
          setQuizzes(data.user);
          groupQuizzesBySubjectAndLevel(data.user);
        }
      } catch (error) {
        console.error("Error loading quizzes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) fetchQuizzes();
  }, [teacherId]);

  const groupQuizzesBySubjectAndLevel = (quizzes) => {
    const grouped = {};
    
    quizzes.forEach(quiz => {
      const key = `${quiz.subject}-${quiz.level}`;
      
      if (!grouped[key]) {
        grouped[key] = {
          subject: quiz.subject,
          level: quiz.level,
          quizzes: []
        };
      }
      
      grouped[key].quizzes.push(quiz);
    });
    
    setGroupedQuizzes(grouped);
  };

  const handleGroupClick = (key) => {
    setExpandedGroup(expandedGroup === key ? null : key);
  };

  if (loading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading quizzes...</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center mb-8">
          <div className="bg-blue-100 p-3 rounded-full mr-4">
            <FaBook className="text-blue-600 text-2xl" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-800">My Quizzes</h1>
            <p className="text-gray-600">Manage and organize your quizzes by subject and level</p>
          </div>
        </div>

        {Object.keys(groupedQuizzes).length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <FaBook className="text-gray-400 text-3xl" />
            </div>
            <h3 className="text-xl font-medium text-gray-700 mb-2">No quizzes yet</h3>
            <p className="text-gray-500 max-w-md mx-auto">
              You haven't created any quizzes yet. Start creating quizzes to organize them by subject and level.
            </p>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 mb-3">Subjects & Levels</h2>
              <p className="text-gray-500">Click on a subject to view its quizzes</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Object.keys(groupedQuizzes).map(key => {
                const group = groupedQuizzes[key];
                const isExpanded = expandedGroup === key;
                
                return (
                  <div 
                    key={key} 
                    className={`bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-300 ${isExpanded ? 'ring-2 ring-blue-500' : 'hover:shadow-md'}`}
                  >
                    <div 
                      className="p-5 cursor-pointer border-b"
                      onClick={() => handleGroupClick(key)}
                    >
                      <div className="flex justify-between items-center">
                        <div>
                          <h3 className="font-semibold text-lg text-gray-800 flex items-center">
                            <FaBook className="mr-2 text-blue-500" />
                            {group.subject}
                          </h3>
                          <div className="flex items-center mt-2 text-sm text-gray-600">
                            <FaGraduationCap className="mr-1" />
                            <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-full text-xs">
                              {group.level} level
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center">
                          <span className="bg-gray-100 text-gray-700 rounded-full px-3 py-1 text-sm mr-3">
                            {group.quizzes.length} quiz{group.quizzes.length !== 1 ? 'zes' : ''}
                          </span>
                          <FaChevronRight className={`text-gray-400 transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                        </div>
                      </div>
                    </div>
                    
                    {isExpanded && (
                      <div className="p-5 bg-gray-50 animate-fadeIn">
                        <h4 className="font-medium text-gray-700 mb-4 flex items-center">
                          <span className="h-2 w-2 bg-blue-500 rounded-full mr-2"></span>
                          Quizzes in {group.subject} ({group.level})
                        </h4>
                        
                        <div className="space-y-4">
                          {group.quizzes.map((quiz) => (
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
                                <span>Created: {new Date(quiz.createdAt).toLocaleDateString()}</span>
                              </div>

                              <button
                                className="mt-3 w-full bg-blue-500 text-white py-2 px-4 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-600 transition text-sm font-medium"
                                onClick={() => navigate(`/teacher/playquiz/${quiz._id}`)}
                              >
                                <FaPlay /> Play Quiz
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

export default TeacherQuiz;