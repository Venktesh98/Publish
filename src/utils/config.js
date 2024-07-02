import axios from "axios";

export const API_URL = "http://localhost:8000/api/v1";

export const blogServiceAPI = axios.create({
  baseURL: `${API_URL}`,
});

blogServiceAPI.interceptors.request.use(
  (config) => {
    const token = sessionStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const blogServiceUserRegisterAPI = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
