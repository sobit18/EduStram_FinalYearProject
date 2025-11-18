import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addContentApi } from "../api/content.api";
import { useNavigate } from "react-router-dom";

const AddContent = ({ courses }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const onSubmit = async (formData) => {
    try {
      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "description") {
          data.append("description", formData.description[0]); // PDF
        } else {
          data.append(key, formData[key]);
        }
      });

      // Pass courseId separately
      await addContentApi(data, formData.courseId);

      setShowSuccess(true);
      reset();

      setTimeout(() => {
        setShowSuccess(false);
        navigate("../content");
      }, 1000);
    } catch (error) {
      console.error("Error adding content:", error);
      alert("Failed to add content");
    }
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Add Content</h2>

      {showSuccess && (
        <div className="mb-4 p-3 text-green-800 bg-green-100 rounded-lg">
          Content added successfully!
        </div>
      )}

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-6"
        encType="multipart/form-data"
      >
        {/* Select Course */}
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

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title
          </label>
          <input
            type="text"
            {...register("title", { required: "Title is required" })}
            className={`w-full px-4 py-3 border rounded-lg ${
              errors.title
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Chapter */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Chapter
          </label>
          <input
            type="number"
            {...register("chapter", { required: "Chapter is required" })}
            className={`w-full px-4 py-3 border rounded-lg ${
              errors.chapter
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.chapter && (
            <p className="mt-1 text-sm text-red-600">
              {errors.chapter.message}
            </p>
          )}
        </div>

        {/* Teaching Hours */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Teaching Hours
          </label>
          <input
            type="number"
            {...register("teachinghours", {
              required: "Teaching hours are required",
            })}
            className={`w-full px-4 py-3 border rounded-lg ${
              errors.teachinghours
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.teachinghours && (
            <p className="mt-1 text-sm text-red-600">
              {errors.teachinghours.message}
            </p>
          )}
        </div>

        {/* PDF Upload for Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload PDF Description
          </label>
          <input
            type="file"
            accept="application/pdf"
            {...register("description", {
              required: "PDF file is required",
            })}
            className={`w-full px-4 py-3 border rounded-lg ${
              errors.description
                ? "border-red-500 focus:ring-red-500"
                : "border-gray-300 focus:ring-blue-500"
            }`}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Add Content
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddContent;
