import React from "react";

function Input({
  label,
  id,
  name,
  type = "text",
  register, // This will be the register function from useForm()
  errors,
  validation = {},
  className = "",
  placeholder,
  autoComplete,
  ...props
}) {
  // Safety check
  if (typeof register !== "function") {
    console.error("Register function is required for Input component");
    return null;
  }

  return (
    <div className="mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`block w-full  px-3 py-2 border ${
          errors?.[name] ? "border-red-500" : "border-gray-300"
        } rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 ${className}`}
        {...register(name, validation)} // Properly spread the registered field
        {...props}
      />
      {errors?.[name] && (
        <p className="mt-1 text-sm text-red-600">{errors[name].message}</p>
      )}
    </div>
  );
}

export default Input;
