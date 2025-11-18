import React, { useEffect, useState } from "react";
import { getSchedulesApi } from "../api/schedule.api";

function Scheduletable({ teacherId }) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const res = await getSchedulesApi(teacherId);
        setSchedule(res.user || []);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to load schedule.");
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) fetchSchedules();
  }, [teacherId]);

  if (loading) {
    return (
      <div className="min-h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center mb-4">
            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-indigo-600"></div>
          </div>
          <p className="text-indigo-800 font-medium">Loading schedule...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-64 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-md text-center">
          <div className="text-red-500 mb-3">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Unable to load schedule</h3>
          <p className="text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-2xl p-4">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-indigo-700 to-indigo-600 px-6 py-4 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold">Teaching Schedule</h2>
              <p className="text-indigo-200 text-sm mt-1">
                {schedule.length} {schedule.length === 1 ? 'class' : 'classes'} scheduled
              </p>
            </div>
            <div className="bg-indigo-800 text-xs font-medium px-3 py-1 rounded-full">
              Teacher ID: {teacherId}
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-indigo-50 text-indigo-800">
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">#</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Level</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">Start Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">End Time</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {schedule.length > 0 ? (
                schedule.map((item, index) => (
                  <tr key={item._id} className="hover:bg-indigo-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-indigo-900 bg-indigo-100 rounded-full w-8 h-8 flex items-center justify-center">
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{item.subject}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        item.level === "Undergraduate" 
                          ? "bg-blue-100 text-blue-800" 
                          : item.level === "Graduate" 
                          ? "bg-purple-100 text-purple-800" 
                          : "bg-indigo-100 text-indigo-800"
                      }`}>
                        {item.level}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.startTime}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-500 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {item.endTime}
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-12 text-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto text-indigo-300 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <h3 className="text-lg font-semibold text-gray-700">No schedule found</h3>
                    <p className="text-gray-500 mt-1">This teacher doesn't have any classes scheduled yet.</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        {schedule.length > 0 && (
          <div className="bg-indigo-50 px-6 py-3 text-xs text-indigo-700">
            Last updated: {new Date().toLocaleDateString()}
          </div>
        )}
      </div>
    </div>
  );
}

export default Scheduletable;