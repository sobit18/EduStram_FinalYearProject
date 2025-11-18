import React, { useEffect, useState } from "react";
import { getSchedulesForStudentApi } from "../api/schedule.api";

const UserSchedule = ({ level, faculty }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSchedulesForStudentApi(level, faculty);
        setSchedule(data?.user || []);
      } catch (error) {
        console.error("Failed to fetch schedule:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, [level, faculty]);

  // Extract unique days from schedule
  const days = [...new Set(schedule.map(item => item.day))].sort();

  // Filter schedule based on selected day and search term
  const filteredSchedule = schedule.filter(item => {
    const matchesDay = selectedDay === "All" || item.day === selectedDay;
    const matchesSearch = item.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesDay && matchesSearch;
  });

  // Calculate total hours
  const totalHours = filteredSchedule.reduce((total, item) => {
    const [startHour, startMinute] = item.startTime.split(":").map(Number);
    const [endHour, endMinute] = item.endTime.split(":").map(Number);
    return total + (endHour - startHour) + (endMinute - startMinute) / 60;
  }, 0);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-lg text-gray-600">Loading your schedule...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-6 border border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Class Schedule</h1>
              <p className="text-gray-600 mt-1">
                {level} • {faculty}
              </p>
            </div>
            <div className="flex items-center">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search subjects..."
                  className="pl-10 pr-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-full md:w-64 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-3"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Day Filter */}
        <div className="bg-white rounded-2xl shadow-sm p-4 mb-6 overflow-x-auto border border-gray-100">
          <div className="flex space-x-2 min-w-max">
            <button
              onClick={() => setSelectedDay("All")}
              className={`px-4 py-2.5 rounded-xl transition-all ${selectedDay === "All" ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
            >
              All Days
            </button>
            {days.map((day) => (
              <button
                key={day}
                onClick={() => setSelectedDay(day)}
                className={`px-4 py-2.5 rounded-xl transition-all ${selectedDay === day ? "bg-blue-500 text-white shadow-md" : "bg-gray-100 text-gray-700 hover:bg-gray-200"}`}
              >
                {day}
              </button>
            ))}
          </div>
        </div>

        {/* Schedule Cards for Mobile */}
        <div className="md:hidden space-y-4">
          {filteredSchedule.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-sm p-6 text-center border border-gray-100">
              <svg
                className="w-12 h-12 text-gray-300 mx-auto mb-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
              <p className="text-gray-500">No classes found</p>
            </div>
          ) : (
            filteredSchedule.map((item) => {
              const [startHour, startMinute] = item.startTime.split(":").map(Number);
              const [endHour, endMinute] = item.endTime.split(":").map(Number);
              const startTotal = startHour * 60 + startMinute;
              const endTotal = endHour * 60 + endMinute;
              const durationMinutes = endTotal - startTotal;
              const duration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;

              return (
                <div key={item._id} className="bg-white rounded-2xl shadow-sm p-4 border-l-4 border-blue-500 hover:shadow-md transition-all border border-gray-100">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-gray-800">{item.subject}</h3>
                      <p className="text-sm text-gray-500 mt-1">{item.day}</p>
                    </div>
                    <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-1 rounded-lg">
                      {duration}
                    </span>
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Time</p>
                      <p className="text-sm font-medium text-gray-700">{item.startTime} - {item.endTime}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-medium">Duration</p>
                      <p className="text-sm font-medium text-gray-700">{duration}</p>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Schedule Table for Desktop */}
        <div className="hidden md:block bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100">
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Subject
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Day
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    End Time
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSchedule.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="px-6 py-8 text-center">
                      <svg
                        className="w-12 h-12 text-gray-300 mx-auto mb-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                        />
                      </svg>
                      <p className="text-gray-500">No classes found</p>
                    </td>
                  </tr>
                ) : (
                  filteredSchedule.map((item) => {
                    const [startHour, startMinute] = item.startTime.split(":").map(Number);
                    const [endHour, endMinute] = item.endTime.split(":").map(Number);
                    const startTotal = startHour * 60 + startMinute;
                    const endTotal = endHour * 60 + endMinute;
                    const durationMinutes = endTotal - startTotal;
                    const duration = `${Math.floor(durationMinutes / 60)}h ${durationMinutes % 60}m`;

                    return (
                      <tr
                        key={item._id}
                        className="hover:bg-blue-50 transition-colors"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="h-2.5 w-2.5 rounded-full bg-blue-500 mr-3"></div>
                            <div className="text-sm font-medium text-gray-900">
                              {item.subject}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                            {item.day}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 font-medium">
                            {item.startTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 font-medium">
                            {item.endTime}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-700 font-medium">{duration}</div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Summary */}
        <div className="mt-6 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Schedule Summary</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 p-4 rounded-xl border border-blue-100">
              <p className="text-sm text-gray-600">Total Subjects</p>
              <p className="text-2xl font-bold text-blue-600 mt-1">{filteredSchedule.length}</p>
            </div>
            <div className="bg-green-50 p-4 rounded-xl border border-green-100">
              <p className="text-sm text-gray-600">Total Hours</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{totalHours.toFixed(1)}h</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-xl border border-purple-100">
              <p className="text-sm text-gray-600">Days with Classes</p>
              <p className="text-2xl font-bold text-purple-600 mt-1">
                {[...new Set(filteredSchedule.map(item => item.day))].length}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSchedule;