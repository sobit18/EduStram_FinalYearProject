import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "../api/logout.api";


function Teacherlogout({ setIsAuthenticated, setRole }) {
  const navigate = useNavigate();

 const handleLogout = async () => {
  try {
    await logout(); // backend logout
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    setRole("");
    navigate("/login");
  } catch (error) {
    console.error("Logout failed:", error);
  }
};


  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          backgroundColor: "#f0f2f5",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div
          style={{
            backgroundColor: "#fff",
            padding: "40px",
            borderRadius: "12px",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
            textAlign: "center",
            minWidth: "300px",
          }}
        >
          <h2 style={{ marginBottom: "16px" }}>Do you want to log out?</h2>
          <p style={{ color: "#555", marginBottom: "24px" }}>
            Click the button below to safely log out.
          </p>
          <button
            onClick={handleLogout}
            style={{
              padding: "10px 24px",
              fontSize: "16px",
              borderRadius: "6px",
              border: "none",
              backgroundColor: "#ff4d4f",
              color: "#fff",
              cursor: "pointer",
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
}

export default Teacherlogout;
