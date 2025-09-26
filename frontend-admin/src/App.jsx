import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./home/Home.jsx";
import Login from "./auth/Login.jsx";
import Signup from "./auth/Signup.jsx";
import axios from "axios";
import { Toaster } from "sonner";

axios.defaults.withCredentials = true;
axios.defaults.baseURL = `${import.meta.env.VITE_SERVER_URL}`;

function App() {
  const [ok, setOk] = React.useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (!ok) throw new Error("You are not logged in");
      } catch (error) {
        if (
          window.location.pathname !== "/login" &&
          window.location.pathname !== "/signup"
        )
          navigate("/login");
      }
    };

    checkAuth();
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>

      <Toaster position="top-center" richColors={true} />
    </>
  );
}

export default App;
