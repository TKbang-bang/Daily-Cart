import axios from "axios";
import { setAccessToken } from "./token.service";

export const signup = async (firstName, lastName, email, password) => {
  try {
    const res = await axios.post("/auth/signup", {
      firstName,
      lastName,
      email,
      password,
    });
    if (res.status != 200) return { ok: false, message: res.data.message };

    setAccessToken(res.data.accessToken);

    return { ok: true, message: res.data.message || "Signup successful" };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};

export const login = async (email, password) => {
  try {
    // check if all fields are filled
    if (!email || !password)
      return { ok: false, message: "All fields are required" };

    // sending the request
    const res = await axios.post("/auth/login", {
      email,
      password,
    });
    if (res.status != 200) return { ok: false, message: res.data.message };

    // setting the token
    setAccessToken(res.data.accessToken);

    // if the request was successful
    return { ok: true, message: res.data.message || "User logged in" };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
