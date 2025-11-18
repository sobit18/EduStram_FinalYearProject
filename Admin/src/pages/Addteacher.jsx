import React from "react";
import { useForm } from "react-hook-form";
import Input from "../components/Input";
import Button from "../components/Button";
import { addTeacherApi } from "../api/teacher.api";
import { useNavigate } from "react-router-dom";

function Addteacher() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    console.log("add Teacher is submit: ", data);
    const response = await addTeacherApi({ ...data });
    console.log("Response is: ", response);
    reset(); // This will clear the form after submission
    navigate("/admin/teachermanagement");
  };

  console.log(watch("example"));
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto  bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl">
        <div className="p-8">
          <div className="text-3xl font-bold text-center text-gray-800 mb-8">
            Enter Teacher Details
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <Input
              label="Fullname"
              name="fullName"
              type="text"
              register={register}
              validation={{ required: "Fullname is required" }}
              error={errors.fullName}
              className="mb-4"
            />
            <Input
              label="Email"
              name="email"
              type="email"
              register={register}
              validation={{
                required: "Email is required",
              }}
              error={errors.email}
              className="mb-4"
            />
            <Input
              label="Phone"
              name="phone"
              type="text"
              register={register}
              validation={{
                required: "phone is required",
              }}
              error={errors.email}
              className="mb-4"
            />
            <Input
              label="Faculty"
              name="faculty"
              type="text"
              register={register}
              validation={{
                required: "phone is required",
              }}
              error={errors.email}
              className="mb-4"
            />
            <Input
              label="Course"
              name="course"
              type="text"
              register={register}
              validation={{
                required: "Subject is required",
              }}
              error={errors.subject}
              className="mb-4"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors duration-200"
              >
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Addteacher;
