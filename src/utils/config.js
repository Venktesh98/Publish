import axios from "axios";


export const blogServiceAPI = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_blog_service_url}`,
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
  baseURL: `${process.env.NEXT_PUBLIC_blog_service_url}`,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});