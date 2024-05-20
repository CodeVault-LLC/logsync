import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const jwt = cookies.get("jwt");

export const api = axios.create({
  baseURL: "http://localhost:8080/",
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
