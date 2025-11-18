import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Added useNavigate
import { getQuizByIdApi } from "../api/quiz.api";

const QuizPlay = () => {
  const { quizId } = useParams();
  const navigate = useNavigate(); // Initialize navigate
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [redirectCountdown, setRedirectCountdown] = useState(5); // Added countdown state

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await getQuizByIdApi(quizId);
        setQuiz(res?.user);
      } catch (error) {
        console.error("Error loading quiz:", error);
      }
    };

    fetchQuiz();
  }, [quizId]);

  // Auto-redirect functionality
  useEffect(() => {
    let countdownInterval;
    if (submitted && showResults) {
      countdownInterval = setInterval(() => {
        setRedirectCountdown(prev => {
          if (prev <= 1) {
            clearInterval(countdownInterval);
            navigate('/student/quizzes'); // Redirect to quizzes page
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => clearInterval(countdownInterval);
  }, [submitted, showResults, navigate]);

  const handleAnswer = (qIndex, option) => {
    setAnswers((prev) => ({ ...prev, [qIndex]: option }));
  };

  const calculateScore = () => {
    let correctCount = 0;
    quiz.questions.forEach((question, index) => {
      // Use 'answer' instead of 'correctAnswer' based on your data structure
      if (answers[index] === question.answer) {
        correctCount++;
      }
    });
    setScore(correctCount);
    return correctCount;
  };

  const handleSubmit = () => {
    const correctAnswers = calculateScore();
    setSubmitted(true);
    setShowResults(true);
    console.log(`Score: ${correctAnswers}/${quiz.questions.length}`);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quiz.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const progressPercentage = ((currentQuestionIndex + 1) / (quiz?.questions.length || 1)) * 100;

  if (!quiz) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading quiz...</p>
        </div>
      </div>
    );
  }

  const currentQuestion = quiz.questions[currentQuestionIndex];
  // Use 'answer' instead of 'correctAnswer'
  const isCorrect = answers[currentQuestionIndex] === currentQuestion.answer;
  const showAnswerFeedback = submitted && showResults;
  const answeredQuestionsCount = Object.keys(answers).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">{quiz.title}</h2>
          <p className="text-gray-600 mb-4">Subject: {quiz.subject} | Level: {quiz.level}</p>
          
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">
                Question {currentQuestionIndex + 1} of {quiz.questions.length}
              </span>
              <span className="text-sm font-medium text-gray-700">
                {Math.round(progressPercentage)}% Complete
              </span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2.5">
              <div 
                className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
          </div>

          {/* Question Navigation Dots */}
          <div className="flex justify-center space-x-2 mt-4">
            {quiz.questions.map((_, index) => (
              <button
                key={index}
                onClick={() => !submitted && setCurrentQuestionIndex(index)}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentQuestionIndex === index
                    ? 'bg-blue-600 text-white'
                    : answers[index]
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-300 text-gray-700'
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>

        {/* Question Card */}
        <div className={`bg-white rounded-xl shadow-md overflow-hidden mb-6 ${
          showAnswerFeedback ? (isCorrect ? "border-l-4 border-green-500" : "border-l-4 border-red-500") : ""
        }`}>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-4 text-gray-800">
              <span className="text-blue-600">Q{currentQuestionIndex + 1}.</span> {currentQuestion.question}
            </h3>
            
            <div className="space-y-3">
              {currentQuestion.options.map((opt, optIdx) => {
                let optionStyle = "p-4 border rounded-lg cursor-pointer transition-all duration-200";
                
                if (showAnswerFeedback) {
                  if (opt === currentQuestion.answer) {
                    optionStyle += " bg-green-100 border-green-500";
                  } else if (answers[currentQuestionIndex] === opt && !isCorrect) {
                    optionStyle += " bg-red-100 border-red-500";
                  }
                } else {
                  optionStyle += answers[currentQuestionIndex] === opt 
                    ? " bg-blue-100 border-blue-500" 
                    : " border-gray-200 hover:border-blue-300 hover:bg-blue-50/50";
                }
                
                return (
                  <div
                    key={optIdx}
                    className={optionStyle}
                    onClick={() => !submitted && handleAnswer(currentQuestionIndex, opt)}
                  >
                    <div className="flex items-center">
                      <div className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                        answers[currentQuestionIndex] === opt 
                          ? showAnswerFeedback 
                            ? opt === currentQuestion.answer 
                              ? "border-green-500 bg-green-500 text-white" 
                              : "border-red-500 bg-red-500 text-white"
                            : "border-blue-500 bg-blue-500 text-white" 
                          : "border-gray-400"
                      }`}>
                        {answers[currentQuestionIndex] === opt && !showAnswerFeedback && "✓"}
                        {showAnswerFeedback && opt === currentQuestion.answer && "✓"}
                        {showAnswerFeedback && answers[currentQuestionIndex] === opt && opt !== currentQuestion.answer && "✗"}
                      </div>
                      <span>{opt}</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {showAnswerFeedback && (
              <div className={`mt-4 p-3 rounded-lg ${isCorrect ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"}`}>
                <span className="font-medium">
                  {isCorrect ? "✓ Correct!" : `✗ Incorrect. The correct answer is: ${currentQuestion.answer}`}
                </span>
              </div>
            )}
          </div>
          
          {/* Navigation Buttons */}
          <div className="px-6 py-4 bg-gray-50 flex justify-between">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestionIndex === 0 || submitted}
              className={`px-5 py-2 rounded-lg font-medium ${
                currentQuestionIndex === 0 || submitted
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed' 
                  : 'bg-white text-blue-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              ← Previous
            </button>
            
            {currentQuestionIndex < quiz.questions.length - 1 ? (
              <button
                onClick={handleNextQuestion}
                disabled={submitted}
                className={`px-5 py-2 rounded-lg font-medium ${
                  submitted
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                Next →
              </button>
            ) : (
              !submitted && (
                <button
                  onClick={handleSubmit}
                  disabled={answeredQuestionsCount !== quiz.questions.length}
                  className={`px-5 py-2 rounded-lg font-medium ${
                    answeredQuestionsCount !== quiz.questions.length
                      ? 'bg-gray-400 text-gray-200 cursor-not-allowed'
                      : 'bg-green-600 text-white hover:bg-green-700'
                  }`}
                >
                  Submit Quiz
                </button>
              )
            )}
          </div>
        </div>

        {/* Results Section */}
        {submitted && (
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="text-xl font-semibold text-blue-800 mb-4">Quiz Results</h3>
            <div className="text-center py-4">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {score}/{quiz.questions.length}
              </div>
              <div className="text-gray-600 mb-4">
                {score === quiz.questions.length 
                  ? "Perfect score! 🎉" 
                  : score >= quiz.questions.length * 0.7 
                  ? "Great job! 👍" 
                  : "Keep practicing! 💪"}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mb-6">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${(score / quiz.questions.length) * 100}%` }}
                ></div>
              </div>
              
              {/* Auto-redirect countdown and manual button */}
              <div className="mt-6">
                <p className="text-gray-600 mb-4">
                  Redirecting to quizzes in {redirectCountdown} seconds...
                </p>
                <button
                  onClick={() => navigate('/teacher/quiz')}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-6 rounded-lg transition-colors"
                >
                  Go to Quizzes Now
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPlay;