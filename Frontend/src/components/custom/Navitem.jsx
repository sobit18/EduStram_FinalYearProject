import React from "react";
import { NavLink } from "react-router";


function Navitem(props) {
  return (
    <>
      <NavLink
        to={props.to}
        className={({ isActive }) =>
          isActive ? "font-bold" : "text-gray-500"
        }
      >
        {props.head}
      </NavLink>
    </>
  );
}

export default Navitem;
