import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { addAnnouncementApi } from "../api/announcement";
// import { addAnnouncementApi } from "../api/announcement.api"; // ✅ new <API />

const AddAnnouncement = ({ courses }) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const { courseId, title, announcement } = data;

      const announcementData = {
        title,
        announcement,
      };

      await addAnnouncementApi(courseId, announcementData);

      reset();
      navigate("../announcement"); // ✅ redirect to announcements page
    } catch (err) {
      console.error("Failed to create announcement:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-8">
          <div className="flex items-center mb-8">
            <div className="bg-blue-100 p-3 rounded-full mr-4">
              <svg
                className="w-8 h-8 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M11 5.055A9.003 9.003 0 0121 12v1a3 3 0 01-3 3H7l-4 4V7a2 2 0 012-2h6z"
                ></path>
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-gray-800">
              Create New Announcement
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

            {/* Announcement Title */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Announcement Title
              </label>
              <input
                id="title"
                type="text"
                {...register("title", {
                  required: "Announcement title is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.title
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="Enter announcement title"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.title.message}
                </p>
              )}
            </div>

            {/* Announcement Message */}
            <div>
              <label
                htmlFor="announcement"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Announcement Message
              </label>
              <textarea
                id="announcement"
                rows={4}
                {...register("announcement", {
                  required: "Announcement message is required",
                })}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:outline-none ${
                  errors.announcement
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200 focus:border-blue-500"
                }`}
                placeholder="Write your announcement here..."
              ></textarea>
              {errors.announcement && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.announcement.message}
                </p>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                type="submit"
                className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-200 font-medium shadow-sm hover:shadow-md transition-all duration-200"
              >
                Create Announcement
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAnnouncement;
