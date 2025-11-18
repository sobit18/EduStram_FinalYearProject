import React, { useState, useEffect } from "react";
import { getSchedulesApi } from "../api/schedule.api"; // adjust path if needed

function Schedule({ teacherId }) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  console.log("teacher id id",teacherId)

  useEffect(() => {
    const fetchSchedules = async () => {
      try {
        setLoading(true);
        const res = await getSchedulesApi(teacherId);
        console.log("schedule is",res)
        
        // assuming API returns { success:true, data:[ ...schedules ] }
        setSchedule(res.user || []);
      } catch (err) {
        console.error("Error fetching schedules:", err);
        setError("Failed to load schedule.");
      } finally {
        setLoading(false);
      }
    };

    if (teacherId) {
      fetchSchedules();
    }
  }, [teacherId]);

  // Function to calculate duration
  const calculateDuration = (start, end) => {
    const parseTime = (timeStr) => {
      let [hour, minute] = timeStr.split(":").map(Number);
      let isPM = timeStr.includes("PM");
      if (isPM && hour !== 12) hour += 12;
      if (!isPM && hour === 12) hour = 0;
      return hour * 60 + minute;
    };

    const startMin = parseTime(start);
    const endMin = parseTime(end);
    const diff = endMin - startMin;

    const hours = Math.floor(diff / 60);
    const minutes = diff % 60;

    return `${hours}h ${minutes}m`;
  };

  if (loading) {
    return <div className="text-center py-10 text-indigo-600">Loading schedule...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-purple-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            Class Schedule
          </h1>
          <p className="text-xl text-indigo-700/80 mb-2">Your daily academic plan</p>
          <div className="inline-flex items-center justify-center px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm border border-indigo-100">
            <span className="text-indigo-700 font-medium">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Schedule Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {schedule.map((item, index) => (
            <div 
              key={item.id}
              className="bg-white rounded-2xl p-6 shadow-lg border border-indigo-100/50 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-xl font-semibold text-indigo-900 mb-1">
                    {item.subject}
                  </h3>
                  <div className="flex items-center text-indigo-600">
                    <span className="text-sm bg-indigo-100 px-2 py-1 rounded-full">
                      Class {item.level}
                    </span>
                  </div>
                </div>
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
                  {index + 1}
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="bg-indigo-50 rounded-xl p-3">
                  <div className="text-xs text-indigo-600/70 mb-1">Start Time</div>
                  <div className="text-indigo-800 font-medium">{item.startTime}</div>
                </div>
                
                <div className="bg-indigo-50 rounded-xl p-3">
                  <div className="text-xs text-indigo-600/70 mb-1">End Time</div>
                  <div className="text-indigo-800 font-medium">{item.endTime}</div>
                </div>
              </div>
              
              <div className="flex justify-between items-center">
                <div className="text-sm text-indigo-600/80">
                  Duration: {calculateDuration(item.startTime, item.endTime)}
                </div>
                <div className={`text-xs px-2 py-1 rounded-full ${
                  index === 0 ? "bg-green-100 text-green-800" : 
                  index === schedule.length - 1 ? "bg-purple-100 text-purple-800" : 
                  "bg-blue-100 text-blue-800"
                }`}>
                  {index === 0 ? "First Class" : index === schedule.length - 1 ? "Last Class" : "Midday"}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        <div className="text-center mt-8 text-indigo-600/70 text-sm">
          <p>Your schedule is looking great! Have a productive day.</p>
        </div>
      </div>
    </div>
  );
}

export default Schedule;
