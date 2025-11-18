import React, { useState, useEffect } from "react";
import {
  deleteScheduleApi,
  getScheduleApi,
  updateScheduleApi,
} from "../api/schedule.api";
import {
  FaCalendarAlt,
  FaEdit,
  FaTrash,
  FaClock,
  FaTimes,
  FaSave,
} from "react-icons/fa";

function ScheduleDetails() {
  const [schedules, setSchedules] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [editFormData, setEditFormData] = useState({
    level: "",
    faculty: "",
    subject: "",
    startTime: "",
    endTime: "",
  });

  useEffect(() => {
    const fetchSchedulesDetails = async () => {
      try {
        const res = await getScheduleApi();
        setSchedules(res?.user || []);
      } catch (error) {
        console.error("Error fetching schedule details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedulesDetails();
  }, []);

  const handleDelete = async (_id) => {
    if (window.confirm("Are you sure you want to delete this schedule?")) {
      try {
        await deleteScheduleApi(_id);
        setSchedules(schedules.filter((schedule) => schedule._id !== _id));
      } catch (error) {
        console.error("Error deleting schedule:", error);
        alert("Failed to delete schedule.");
      }
    }
  };

  const handleEditClick = (schedule) => {
    setEditingSchedule(schedule._id);
    setEditFormData({
      level: schedule.level || "",
      faculty: schedule.faculty || "",
      subject: schedule.subject || "",
      startTime: schedule.startTime || "",
      endTime: schedule.endTime || "",
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
    try {
      await updateScheduleApi(editingSchedule, editFormData);

      // Update local state
      setSchedules(
        schedules.map((schedule) =>
          schedule._id === editingSchedule
            ? { ...schedule, ...editFormData }
            : schedule
        )
      );

      setEditingSchedule(null);
      alert("Schedule updated successfully!");
    } catch (error) {
      console.error("Error updating schedule:", error);
      alert("Failed to update schedule.");
    }
  };

  const handleCancelEdit = () => {
    setEditingSchedule(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      {/* Edit Form Modal */}
      {editingSchedule && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-indigo-900">
                  Edit Schedule
                </h3>
                <button
                  onClick={handleCancelEdit}
                  className="text-gray-500 hover:text-gray-700"
                  type="button"
                >
                  <FaTimes className="h-5 w-5" />
                </button>
              </div>

              <form onSubmit={handleEditFormSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Level
                    </label>
                    <select
                      name="level"
                      value={editFormData.level}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select Level</option>
                      <option value="11">11</option>
                      <option value="12">12</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Faculty
                    </label>
                    <select
                      name="faculty"
                      value={editFormData.faculty}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    >
                      <option value="">Select Faculty</option>
                      <option value="science">Science</option>
                      <option value="management">Management</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={editFormData.subject}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Start Time
                    </label>
                    <input
                      type="time"
                      name="startTime"
                      value={editFormData.startTime}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      End Time
                    </label>
                    <input
                      type="time"
                      name="endTime"
                      value={editFormData.endTime}
                      onChange={handleEditFormChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      required
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={handleCancelEdit}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center"
                  >
                    <FaSave className="mr-2" />
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-indigo-900 flex items-center">
              <FaCalendarAlt className="mr-3" />
              Schedule Management
            </h1>
            <p className="text-indigo-600 mt-2">
              Manage all class schedules in the system
            </p>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center h-64 bg-white rounded-xl shadow-lg">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500 mx-auto mb-4"></div>
              <p className="text-indigo-800 font-medium">Loading schedules...</p>
            </div>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-indigo-700">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Teacher
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Level
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Faculty
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Subject
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Start Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      End Time
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-white uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {schedules.length > 0 ? (
                    schedules.map((schedule) => (
                      <tr
                        key={schedule._id}
                        className="hover:bg-indigo-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          {schedule.teacherId?.userId?.fullName || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {schedule.level || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {schedule.faculty || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {schedule.subject || "N/A"}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900 flex items-center">
                          <FaClock className="h-4 w-4 text-indigo-500 mr-1" />
                          {schedule.startTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap ">
                          <div className="text-sm text-gray-900 flex items-center">
                          <FaClock className="h-4 w-4 text-indigo-500 mr-1" />
                          {schedule.endTime}
                          </div>
                        </td>
                         
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <div className="flex space-x-3">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditClick(schedule);
                              }}
                              className="text-indigo-600 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 p-2 rounded-lg transition-colors"
                              type="button"
                            >
                              <FaEdit />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDelete(schedule._id);
                              }}
                              className="text-red-600 hover:text-red-900 bg-red-50 hover:bg-red-100 p-2 rounded-lg transition-colors"
                              type="button"
                            >
                              <FaTrash />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="7"
                        className="px-6 py-12 text-center text-gray-500"
                      >
                        No schedules found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default ScheduleDetails;
