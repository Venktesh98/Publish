import axios from "axios";

export const API_URL = "http://localhost:8000/api/v1";
const token = sessionStorage.getItem("token");

export const blogServiceAPI = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const blogServiceUserRegisterAPI = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
