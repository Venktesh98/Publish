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

export const blogServiceUserCreateNewPostAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_blog_service_url,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// Adding an interceptor to set the Authorization header
blogServiceUserCreateNewPostAPI.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = sessionStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default blogServiceUserCreateNewPostAPI;
