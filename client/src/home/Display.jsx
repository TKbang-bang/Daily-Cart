import React from "react";
import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Home from "./views/Home";

function Display() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default Display;
