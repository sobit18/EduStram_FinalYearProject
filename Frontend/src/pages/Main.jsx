import React from "react";
import Nav from "./Nav";
import { Outlet } from "react-router";
import Footer from "../components/Footer";

function Main() {
  return (
    <>
      <div>
        <Nav/>
      </div>
      <div>
        <Outlet/>
      </div>
      <div>
        <Footer/>
      </div>
    </>
  );
}

export default Main;
