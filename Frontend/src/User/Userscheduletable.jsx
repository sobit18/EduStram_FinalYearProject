import React, { useEffect, useState } from "react";
import { getSchedulesForStudentApi } from "../api/schedule.api";

const Userscheduletable = ({ level, faculty }) => {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDay, setSelectedDay] = useState("All");

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

  // Filter schedule based on selected day
  const filteredSchedule = selectedDay === "All" 
    ? schedule 
    : schedule.filter(item => item.day === selectedDay);

  if (loading) {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-blue-500"></div>
        <span className="ml-2 text-gray-600">Loading schedule...</span>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-3">
        <h2 className="text-xl font-semibold text-gray-800">Class Schedule</h2>
        
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedDay("All")}
            className={`px-3 py-1 text-sm rounded-lg transition-all ${
              selectedDay === "All" 
                ? "bg-blue-500 text-white" 
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            All Days
          </button>
          {days.map((day) => (
            <button
              key={day}
              onClick={() => setSelectedDay(day)}
              className={`px-3 py-1 text-sm rounded-lg transition-all ${
                selectedDay === day 
                  ? "bg-blue-500 text-white" 
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {day}
            </button>
          ))}
        </div>
      </div>

      {filteredSchedule.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Day</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Time</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Duration</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredSchedule.map((item) => {
                const [startHour, startMinute] = item.startTime.split(":").map(Number);
                const [endHour, endMinute] = item.endTime.split(":").map(Number);
                const startTotal = startHour * 60 + startMinute;
                const endTotal = endHour * 60 + endMinute;
                const durationMinutes = endTotal - startTotal;
                const hours = Math.floor(durationMinutes / 60);
                const minutes = durationMinutes % 60;
                const duration = hours > 0 ? `${hours}h ${minutes}m` : `${minutes}m`;

                return (
                  <tr key={item._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-900">
                      {item.subject}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                        {item.day}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {item.startTime} - {item.endTime}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-700">
                      {duration}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-6 bg-gray-50 rounded-lg">
          <svg className="w-12 h-12 text-gray-300 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          <p className="text-gray-500">No classes found for {selectedDay}</p>
        </div>
      )}

      {/* Summary */}
      {filteredSchedule.length > 0 && (
        <div className="mt-4 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Showing {filteredSchedule.length} {filteredSchedule.length === 1 ? 'class' : 'classes'}
            </p>
            <p className="text-sm font-medium text-gray-700">
              Total: {filteredSchedule.reduce((total, item) => {
                const [startHour, startMinute] = item.startTime.split(":").map(Number);
                const [endHour, endMinute] = item.endTime.split(":").map(Number);
                return total + ((endHour - startHour) + (endMinute - startMinute) / 60);
              }, 0).toFixed(1)} hours
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Userscheduletable;