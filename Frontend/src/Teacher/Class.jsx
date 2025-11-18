import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TeacherMeetings from "./TeacherMeetings";

function Class({ teacherId }) {
  const [googleConnected, setGoogleConnected] = useState(false);

  useEffect(() => {
    const checkGoogleStatus = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/google/status/${teacherId}`, {
          credentials: "include",
        });
        const data = await res.json();
        setGoogleConnected(data.connected);
      } catch (err) {
        console.error("Error checking Google status", err);
      }
    };

    checkGoogleStatus();
  }, [teacherId]);

  return (
    <div style={{ padding: "30px", maxWidth: "1200px", margin: "0 auto" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          paddingBottom: "15px",
          borderBottom: "1px solid #eaeaea",
        }}
      >
        <h2 style={{ fontWeight: "600", fontSize: "28px" }}>Classes</h2>

        <Link to="../createclass">
          <button
            style={{
              padding: "12px 24px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Create Class
          </button>
        </Link>
      </div>

      {/* Show connect button only if not connected */}
      {!googleConnected ? (
        <a
          href="http://localhost:3000/api/google/auth/google"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Connect Google
        </a>
      ) : (
        <p className="text-green-600 font-semibold">✅ Google Connected</p>
      )}
      <br />

      <div>
        <TeacherMeetings teacherId={teacherId}/>
      </div>
    </div>
    
  );
}

export default Class;
