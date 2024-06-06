import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const jwt = cookies.get("jwt");

const MAIN_URL = import.meta.env.DEV ? "http://localhost:8080/" : "https://logsync-api.onrender.com/";

export const api = axios.create({
  baseURL: MAIN_URL,
  withCredentials: false,

  proxy: {
    host: "localhost",
    port: 8080,
  },

  headers: {
    Authorization: "Bearer " + jwt,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
