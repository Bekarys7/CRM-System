import axios from "axios";
import { authService } from "../services/auth.service";
import { logout } from "../store/authActions";

export const BASE_URL = "https://easydev.club/api/v1";

let store: any;

export const injectStore = (_store: any) => {
  store = _store;
};

export const api = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  const token = authService.accessToken;
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      error.config &&
      !error.config._isRetry &&
      localStorage.getItem("refreshToken")
    ) {
      try {
        originalRequest._isRetry = true;
        await authService.checkAuth();
        if (originalRequest) {
          return api.request(originalRequest);
        }
        throw error;
      } catch {
        await store.dispatch(logout());
      }
    }
    throw error;
  }
);
