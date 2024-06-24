import axios from "axios";

export const API_URL = "http://localhost:8000/api/v1";
const token =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTgyMDFmZTdmY2QxMTU2Njk3MDJjNyIsImlhdCI6MTcxOTIxMjM2OSwiZXhwIjoxNzE5ODE3MTY5fQ.me6uMg0DSuEG38-3yK04965DIjzLfbCrQt-_Qksnlcs";

export const blogServiceAPI = axios.create({
  baseURL: `${API_URL}`,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
