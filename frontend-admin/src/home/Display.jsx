import React from "react";
import Aside from "./Components/Aside.jsx";
import Home from "./Home.jsx";
import "./home.css";

function Display() {
  return (
    <main className="display">
      <Aside />
      <Home />
    </main>
  );
}

export default Display;
