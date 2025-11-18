import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const CreateClass = ({ courses, teacherId }) => {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset, watch } = useForm();

  const startTime = watch("startTime");
  const endTime = watch("endTime");

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    try {
      const { courseId, title, startTime, endTime } = data;
      const selectedCourse = courses.find((c) => c._id === courseId);

      const payload = {
        teacherId: selectedCourse.teacherId,
        title,
        startTime,
        endTime,
        faculty: selectedCourse.faculty,
        level: selectedCourse.level,
        subject: selectedCourse.subject,
      };

      const res = await fetch("http://localhost:3000/api/teacher/createmeet", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload)
      });

      const responseData = await res.json();
      if (res.ok) {
        alert(`Meet created: ${responseData.meetLink}`);
        reset();
        navigate("/teacher/class");
      } else {
        alert(responseData.message || "Failed to create meet");
      }
    } catch (err) {
      console.error("Failed to create meet:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <h2 className="text-2xl font-bold text-gray-800">Create New Class</h2>
            <p className="mt-1 text-sm text-gray-600">Schedule a new virtual classroom session</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="px-6 py-6">
            <div className="mb-6">
              <label htmlFor="courseId" className="block text-sm font-medium text-gray-700 mb-1">
                Select Course <span className="text-red-500">*</span>
              </label>
              <select 
                id="courseId"
                className={`block w-full px-4 py-2.5 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.courseId ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                {...register("courseId", { required: "Course selection is required" })}
              >
                <option value="">Choose a course...</option>
                {courses?.map(c => (
                  <option key={c._id} value={c._id}>
                    {c.subject} - Level {c.level} {c.faculty ? `(${c.faculty})` : ''}
                  </option>
                ))}
              </select>
              {errors.courseId && (
                <p className="mt-1 text-sm text-red-600">{errors.courseId.message}</p>
              )}
            </div>

            <div className="mb-6">
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Class Title <span className="text-red-500">*</span>
              </label>
              <input 
                id="title"
                type="text" 
                placeholder="e.g., Introduction to Calculus, Weekly Review Session"
                className={`block w-full px-4 py-2.5 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                  errors.title ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                }`}
                {...register("title", { 
                  required: "Class title is required",
                  minLength: {
                    value: 5,
                    message: "Title should be at least 5 characters long"
                  }
                })} 
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label htmlFor="startTime" className="block text-sm font-medium text-gray-700 mb-1">
                  Start Time <span className="text-red-500">*</span>
                </label>
                <input 
                  id="startTime"
                  type="datetime-local" 
                  className={`block w-full px-4 py-2.5 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.startTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  {...register("startTime", { 
                    required: "Start time is required",
                    validate: value => {
                      if (endTime && new Date(value) >= new Date(endTime)) {
                        return "Start time must be before end time";
                      }
                      return true;
                    }
                  })} 
                />
                {errors.startTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.startTime.message}</p>
                )}
              </div>
              
              <div>
                <label htmlFor="endTime" className="block text-sm font-medium text-gray-700 mb-1">
                  End Time <span className="text-red-500">*</span>
                </label>
                <input 
                  id="endTime"
                  type="datetime-local" 
                  className={`block w-full px-4 py-2.5 text-gray-700 bg-white border rounded-lg focus:outline-none focus:ring-2 ${
                    errors.endTime ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
                  }`}
                  {...register("endTime", { 
                    required: "End time is required",
                    validate: value => {
                      if (startTime && new Date(value) <= new Date(startTime)) {
                        return "End time must be after start time";
                      }
                      return true;
                    }
                  })} 
                />
                {errors.endTime && (
                  <p className="mt-1 text-sm text-red-600">{errors.endTime.message}</p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mt-8">
              <button
                type="button"
                onClick={() => navigate("/teacher/class")}
                className="px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-5 py-2.5 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating...
                  </>
                ) : (
                  "Create Class"
                )}
              </button>
            </div>
          </form>
        </div>
        
        <div className="mt-8 bg-blue-50 border-l-4 border-blue-500 p-4 rounded-lg">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> The class will be created with the faculty, level, and subject information from the selected course.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateClass;