import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { api } from "../api/axios";
import { checkAuth } from "./authActions";
import { authService } from "../services/auth.service";

export const store = configureStore({
  reducer: { auth: authSlice },
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
        await store.dispatch(checkAuth());
        if (originalRequest) {
          return api.request(originalRequest);
        }
        throw error;
      } catch (error) {
        console.error("Ошибка при обновлении токена:", error);
      }
    }
    throw error;
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
