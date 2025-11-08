import axios from "axios";

// import type { Token } from "../types/Auth.types";

export const BASE_URL = "https://easydev.club/api/v1";

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem(
    "accessToken"
  )}`;
  return config;
});
