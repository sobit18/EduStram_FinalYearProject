import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Input from "../components/Input";
import Button from "../components/Button";
import Card from "../components/custom/Card";
import { addUserApi } from "../api/user.api";

function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await addUserApi(data);

      if (response && response.user) {
        toast.success("Registration successful! Redirecting to login...", {
          onClose: () => reset() // Reset form after toast closes
        });

        setTimeout(() => navigate("../login", { replace: true }), 1500);
      } else {
        toast.error("Registration failed. Please try again.");
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data?.message || "Registration failed");
      } else if (error.request) {
        toast.error("Network error. Please check your connection.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
      </div>

      <Card className="relative z-10 w-full max-w-md transform transition-all duration-300 hover:shadow-xl">
        <div className="text-center mb-6">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
            <svg
              className="h-8 w-8 text-indigo-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800">Join for Learning</h2>
          <p className="mt-2 text-sm text-gray-600">
            Ready to take the next step toward your bright future
          </p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input
            label="Full Name"
            name="fullName"
            type="text"
            register={register}
            validation={{
              required: "Full name is required",
              minLength: { value: 3, message: "Name must be at least 3 characters" },
            }}
            errors={errors}
            placeholder="Enter your full name"
          />

          <Input
            label="Email Address"
            name="email"
            type="email"
            register={register}
            validation={{
              required: "Email is required",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            }}
            errors={errors}
            placeholder="Enter your email"
          />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
              <select
                {...register("level", {
                  required: "Level is required",
                  validate: (value) => ["11","12"].includes(value) || "Invalid level",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                defaultValue=""
              >
                <option value="" disabled>Select Level</option>
                <option value="11">Grade 11</option>
                <option value="12">Grade 12</option>
              </select>
              {errors.level && <p className="text-red-500 text-xs mt-1">{errors.level.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Faculty</label>
              <select
                {...register("faculty", {
                  required: "Faculty is required",
                  validate: (value) => ["science","management"].includes(value) || "Invalid faculty",
                })}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                defaultValue=""
              >
                <option value="" disabled>Select Faculty</option>
                <option value="science">Science</option>
                <option value="management">Management</option>
              </select>
              {errors.faculty && <p className="text-red-500 text-xs mt-1">{errors.faculty.message}</p>}
            </div>
          </div>

          <Input
            label="Password"
            name="password"
            type="password"
            register={register}
            validation={{
              required: "Password is required",
              minLength: { value: 8, message: "Password must be at least 8 characters" },
              pattern: {
                value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,}$/,
                message: "Password must contain at least one letter and one number",
              },
            }}
            errors={errors}
            placeholder="Create a password"
          />

          <Input
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            register={register}
            validation={{
              required: "Please confirm your password",
              validate: (value) => value === watch("password") || "Passwords do not match",
            }}
            errors={errors}
            placeholder="Confirm your password"
          />

          <div className="pt-2">
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Registering..." : "Create Account"}
            </Button>
          </div>
        </form>

        <div className="text-center mt-6 text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
            Sign in here
          </Link>
        </div>
      </Card>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
      `}</style>
    </div>
  );
}

export default Register;
