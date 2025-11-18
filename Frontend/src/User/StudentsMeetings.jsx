import React, { useEffect, useState } from "react";

const StudentMeetings = ({ level, faculty }) => {
  const [meetings, setMeetings] = useState([]);
  const [filteredMeetings, setFilteredMeetings] = useState([]);
  const [filter, setFilter] = useState("all");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/student/meetings`, {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ level, faculty }),
        });
        const data = await res.json();
        
        if (res.ok) {
          const meetingsData = data.data.user || data.data;
          setMeetings(meetingsData);
          setFilteredMeetings(meetingsData);
        } else {
          alert(data.message || "Failed to fetch meetings");
        }
      } catch (error) {
        console.error("Error fetching meetings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, [level, faculty]);

  // Filter meetings based on status
  useEffect(() => {
    const now = new Date();
    if (filter === "upcoming") {
      setFilteredMeetings(meetings.filter(m => new Date(m.startTime) > now));
    } else if (filter === "past") {
      setFilteredMeetings(meetings.filter(m => new Date(m.startTime) <= now));
    } else {
      setFilteredMeetings(meetings);
    }
  }, [filter, meetings]);

  // Function to determine if a meeting is upcoming, ongoing, or past
  const getMeetingStatus = (startTime, endTime) => {
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "ongoing";
    return "past";
  };

  // Format time range
  const formatTimeRange = (startTime, endTime) => {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    const sameDay = start.toDateString() === end.toDateString();
    
    if (sameDay) {
      return `${start.toLocaleDateString()} ${start.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})} - ${end.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;
    } else {
      return `${start.toLocaleString()} - ${end.toLocaleString()}`;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="flex flex-col items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-4 text-gray-600">Loading your meetings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Your Online Classes</h2>
          
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "all" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
              onClick={() => setFilter("all")}
            >
              All Meetings
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "upcoming" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
              onClick={() => setFilter("upcoming")}
            >
              Upcoming
            </button>
            <button 
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${filter === "past" ? "bg-blue-500 text-white" : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"}`}
              onClick={() => setFilter("past")}
            >
              Past
            </button>
          </div>
        </div>

        {filteredMeetings.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-8 text-center">
            <div className="mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-blue-100 text-blue-500 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-medium text-gray-900 mb-2">No meetings found</h3>
            <p className="text-gray-500">You don't have any {filter !== "all" ? filter : ""} meetings scheduled.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMeetings.map((meeting) => {
              const status = getMeetingStatus(meeting.startTime, meeting.endTime);
              const statusColors = {
                upcoming: "bg-blue-100 text-blue-800",
                ongoing: "bg-green-100 text-green-800",
                past: "bg-gray-100 text-gray-800"
              };
              
              return (
                <div key={meeting._id} className="bg-white rounded-xl shadow-sm overflow-hidden transition-transform hover:shadow-md hover:-translate-y-1">
                  <div className="p-6 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-4">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">{meeting.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${statusColors[status]}`}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </span>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                        <span className="text-gray-600">{meeting.subject}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M12 14l9-5-9-5-9 5 9 5z" />
                          <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                        <span className="text-gray-600">{meeting.level} - {meeting.faculty}</span>
                      </div>
                      
                      <div className="flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-gray-600">{formatTimeRange(meeting.startTime, meeting.endTime)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="p-4 bg-gray-50 flex space-x-3">
                    {status !== "past" && (
                      <a 
                        href={meeting.meetLink} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        {status === "ongoing" ? "Join Now" : "Join Meeting"}
                      </a>
                    )}
                    
                    {status === "past" && (
                      <button className="flex-1 flex items-center justify-center px-4 py-2 bg-gray-200 text-gray-700 rounded-lg font-medium cursor-not-allowed" disabled>
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        Meeting Ended
                      </button>
                    )}
                    
                 
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentMeetings;