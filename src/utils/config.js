import axios from "axios";

export const API_URL = "http://localhost:8000/api/v1";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTgyMDFmZTdmY2QxMTU2Njk3MDJjNyIsImlhdCI6MTcxODYwNzMwMSwiZXhwIjoxNzE5MjEyMTAxfQ.WY0HrRGwsKhgxi0ySpz2Ne2QFFor7Aq8HoJL9Uy-IaQ";

export const blogServiceAPI = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
