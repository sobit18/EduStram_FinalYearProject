import React from "react";
import { Link } from "react-router-dom";
import Myassignment from "./Myassignment";
import StudentSubmit from "./StudentSubmit";

function Assignment({ teacherId }) {
  return (
    <div
      style={{
        padding: "30px",
        maxWidth: "1200px",
        margin: "0 auto",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
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
        <h2
          style={{
            color: "#333",
            fontWeight: "600",
            fontSize: "28px",
            margin: 0,
          }}
        >
          Assignments
        </h2>

        <Link to="../addassignment" style={{ textDecoration: "none" }}>
          <button
            style={{
              padding: "12px 24px",
              backgroundColor: "#4CAF50",
              color: "white",
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              fontSize: "16px",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#388E3C";
              e.target.style.boxShadow = "0 6px 8px rgba(0, 0, 0, 0.15)";
              e.target.style.transform = "translateY(-2px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#4CAF50";
              e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            <i className="fas fa-plus"></i>
            Add Assignment
          </button>
        </Link>
      </div>

      <div>
        <Myassignment teacherId={teacherId} />
      </div>
      <div>
        <StudentSubmit teacherId={teacherId} />
      </div>
    </div>
  );
}

export default Assignment;
