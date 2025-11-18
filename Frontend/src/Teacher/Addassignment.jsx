import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom"; // ✅ import useNavigate
import { addAssignmentApi } from "../api/assignment.api";

const Addassignment = ({ courses }) => {
  const navigate = useNavigate(); // ✅ initialize navigate

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

 const onSubmit = async (data) => {
  try {
    const { courseId, title, description, dueDate, subject, level } = data;

    const assignmentData = {
      title,
      description,
      dueDate,
      subject,
      level: level ? parseInt(level) : undefined,
    };

    await addAssignmentApi(courseId, assignmentData);

    reset(); // optional: clear the form
    navigate("../assignment"); // redirect to assignments page
  } catch (err) {
    console.error("Failed to create assignment:", err);
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="bg-green-100 p-3 rounded-full mr-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Assignment
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* Course Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Select Course
              </label>
              <select
                {...register("courseId", { required: "Course is required" })}
                className={`w-full px-4 py-3 border rounded-lg ${
                  errors.courseId
                    ? "border-red-500 focus:ring-red-500"
                    : "border-gray-300 focus:ring-blue-500"
                }`}
              >
                <option value="">Select a course</option>
                {courses?.map((course) => (
                  <option key={course._id} value={course._id}>
                    {course.subject} (Level {course.level})
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.courseId.message}
                </p>
              )}
            </div>

            {/* Assignment Title Field */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Assignment Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", {
                  required: "Assignment title is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.title
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
                placeholder="Enter assignment title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                rows={4}
                {...register("description", {
                  required: "Description is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.description
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
                placeholder="Provide assignment details and instructions"
              ></textarea>
              {errors.description && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Due Date Field */}
            <div>
              <label
                htmlFor="dueDate"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Due Date
              </label>
              <input
                id="dueDate"
                type="date"
                {...register("dueDate", { required: "Due date is required" })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.dueDate
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-green-200 focus:border-green-500"
                }`}
              />
              {errors.dueDate && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.dueDate.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="submit"
                className="px-5 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-200 font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                Create Assignment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Addassignment;
