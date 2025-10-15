import axios from "axios";
import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import { Toaster } from "sonner";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;

function App() {
  useEffect(() => {}, []);

  return (
    <>
      <Routes>
        <Route path="*" element={<h1>Welcome, This is Home</h1>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Toaster position="top-center" richColors={true} />
    </>
  );
}

export default App;
