import React from "react";
import { Link } from "react-router-dom";
import Teacher from "../pages/Teacher";
import TeacherQuiz from "./TeacherQuiz";

function Quiz({teacherId}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8 text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-indigo-800 mb-2">
            Quiz Dashboard
          </h1>
          <p className="text-gray-600 mb-4">Create and manage your quizzes</p>

          {/* Button directly below the text */}
          <Link
            to="../createquiz"
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 inline-flex items-center shadow-md hover:shadow-lg"
          >
            <svg
              className="w-5 h-5 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              ></path>
            </svg>
            Create New Quiz
          </Link>
        </header>
      </div>
      <div>
        <TeacherQuiz teacherId={teacherId}/>
      </div>
    </div>
  );
}

export default Quiz;
