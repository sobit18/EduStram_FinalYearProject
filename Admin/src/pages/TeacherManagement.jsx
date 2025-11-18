import React from "react";
import { Link } from "react-router";
import Teacherdetails from "./Teacherdetails";

function TeacherManagement() {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Teacher Management
          </h1>
          <p className="text-gray-600">
            Manage your institution's faculty members
          </p>
        </div>

        <div className="flex justify-center">
          <Link
            to="/admin/addteacher"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
          >
            <svg
              className="-ml-1 mr-3 h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Add New Teacher
          </Link>
        </div>
      </div>
      <div>
        <Teacherdetails />
      </div>
    </div>
  );
}

export default TeacherManagement;
