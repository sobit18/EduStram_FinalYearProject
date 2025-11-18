import React from "react";

function Card({ children,className }) {
  return (
    <div className={`max-w-md w-full space-y-8 bg-transparent opacity-[90%] p-10 rounded-lg shadow-xl ${className}`}>
      {children}
    </div>
  );
}

export default Card;
