import axios from "axios";

const API_URL = "http://localhost:8000"; // your FastAPI backend

const api = axios.create({
  baseURL: API_URL,
  withCredentials: false,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
