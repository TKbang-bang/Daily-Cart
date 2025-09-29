import api from "./api.service";
import axios from "axios";
import { getAccessToken, setAccessToken } from "./token.service";

export const sessionCheck = async () => {
  try {
    const token = getAccessToken();
    const res = await axios.get("/protected/session/check", {
      withCredentials: true,
      headers: {
        Authorization: token && `Bearer ${token}`,
      },
    });
    if (res.status != 200) return { ok: false, message: res.data.message };

    setAccessToken(res.headers["access-token"].split(" ")[1]);

    return { ok: true, message: res.data.message };
  } catch (error) {
    return {
      ok: false,
      message: error.response?.data?.message || error.message,
    };
  }
};
