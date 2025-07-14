// src/utils/axiosInstance.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/api", // change if backend is deployed
  withCredentials: true, // optional if using cookies
});

export default instance;
