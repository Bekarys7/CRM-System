import axios from "axios";
import { checkAuth } from "../store/authActions";
import { store } from "../store/store";
// import type { Token } from "../types/Auth.types";
import { AxiosError } from "axios";
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

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error: AxiosError) => {
    if (error.response && error.response.status === 401) {
      const originalRequest = error.config;
      console.log(originalRequest);
      store.dispatch(checkAuth());
      if (originalRequest) {
        return api.request(originalRequest);
      }
    }
  }
);
