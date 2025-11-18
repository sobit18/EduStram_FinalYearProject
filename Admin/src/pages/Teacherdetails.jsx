import React, { useState, useEffect } from "react";
import { getTeacherApi, deleteTeacherApi, updateTeacherApi } from "../api/teacher.api";
import { FaUser, FaEnvelope, FaPhone, FaGraduationCap, FaBook, FaTrash, FaEdit } from "react-icons/fa";

function Teacherdetails() {
  const [teachers, setTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTeacher, setEditingTeacher] = useState(null);
  const [editFormData, setEditFormData] = useState({
    name: "",
    email: "",
    phone: "",
    faculty: "",
    course: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchTeachersDetails = async () => {
      try {
        const res = await getTeacherApi();
        console.log("teacher details ",res)
        setTeachers(res?.data || res?.user || []);
      } catch (error) {
        console.error("Error fetching teachers:", error);
        alert("Failed to fetch teachers.");
      } finally {
        setLoading(false);
      }
    };

    fetchTeachersDetails();
  }, []);

  const handleDelete = async (teacherId) => {
    if (window.confirm("Are you sure you want to delete this teacher?")) {
      try {
        await deleteTeacherApi(teacherId);
        setTeachers(teachers.filter((teacher) => teacher._id !== teacherId));
        alert("Teacher deleted successfully!");
      } catch (error) {
        console.error("Error deleting teacher:", error);
        alert("Failed to delete teacher.");
      }
    }
  };

  const handleEditClick = (teacher) => {
    setEditingTeacher(teacher._id);
    setEditFormData({
      name: teacher.name || "",
      email: teacher.email || "",
      phone: teacher.phone || "",
      faculty: teacher.faculty || "",
      course: teacher.course || "",
    });
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value,
    });
  };

  const handleEditFormSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const updatedTeacher = await updateTeacherApi(editingTeacher, editFormData);

      setTeachers(
        teachers.map((teacher) =>
          teacher._id === editingTeacher
            ? { ...teacher, ...updatedTeacher }
            : teacher
        )
      );

      setEditingTeacher(null);
      alert("Teacher updated successfully!");
    } catch (error) {
      console.error("Error updating teacher:", error);
      alert("Failed to update teacher.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingTeacher(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 flex items-center">
              <FaUser className="mr-3" />
              Teacher Management
            </h1>
            <p className="text-indigo-600 mt-2">
              Manage all teachers in the system
            </p>
          </div>
          <div className="text-sm text-indigo-700 bg-indigo-100 px-4 py-2 rounded-lg">
            Total Teachers: {teachers.length}
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-indigo-800 font-medium">Loading teachers...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Email
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Phone
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Course
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {teachers.length > 0 ? (
                    teachers.map((teacher) => (
                      <tr
                        key={teacher._id}
                        className="hover:bg-indigo-50 transition-colors duration-200"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaUser className="mr-3 text-indigo-500" />
                            <div>
                              <div className="font-medium text-gray-900">
                                {teacher.userDetails.fullName || "N/A"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaEnvelope className="mr-3 text-indigo-500" />
                            <div className="text-sm text-gray-900">
                              {teacher.userDetails.email || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaPhone className="mr-3 text-indigo-500" />
                            <div className="text-sm text-gray-900">
                              {teacher.phone || "N/A"}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaGraduationCap className="mr-3 text-indigo-500" />
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                              {teacher.faculty || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FaBook className="mr-3 text-indigo-500" />
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                              {teacher.course || "N/A"}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEditClick(teacher)}
                              className="flex items-center text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                              <FaEdit className="mr-1" />
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(teacher._id)}
                              className="flex items-center text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 px-3 py-2 rounded-lg transition-colors text-sm font-medium"
                            >
                              <FaTrash className="mr-1" />
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="6"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        <FaUser className="mx-auto text-4xl text-gray-300 mb-3" />
                        <div className="text-lg font-medium text-gray-900">No teachers found</div>
                        <p className="text-gray-500 mt-1">Add some teachers to get started</p>
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Edit Teacher Modal */}
        {editingTeacher && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-xl shadow-2xl max-w-md w-full">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-indigo-900 flex items-center">
                    <FaUser className="mr-2" />
                    Edit Teacher
                  </h2>
                </div>
                
                <form onSubmit={handleEditFormSubmit}>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter full name"
                        value={editFormData.name}
                        onChange={handleEditFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="Enter email address"
                        value={editFormData.email}
                        onChange={handleEditFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Enter phone number"
                        value={editFormData.phone}
                        onChange={handleEditFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Faculty
                      </label>
                      <input
                        type="text"
                        name="faculty"
                        placeholder="Enter faculty"
                        value={editFormData.faculty}
                        onChange={handleEditFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Course
                      </label>
                      <input
                        type="text"
                        name="course"
                        placeholder="Enter course"
                        value={editFormData.course}
                        onChange={handleEditFormChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                    <button
                      type="button"
                      onClick={handleCancelEdit}
                      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors font-medium"
                      disabled={isSubmitting}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors font-medium flex items-center disabled:opacity-50"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-t-2 border-b-2 border-white mr-2"></div>
                          Updating...
                        </>
                      ) : (
                        "Update Teacher"
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Teacherdetails;