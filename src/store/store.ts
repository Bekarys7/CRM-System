import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import { api } from "../api/axios";
import { checkAuth } from "./authActions";

export const store = configureStore({
  reducer: { auth: authSlice },
});

api.interceptors.request.use((config) => {
  const state = store.getState();
  const token = state.auth.token;
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
      !error.config._isRetry
    ) {
      try {
        originalRequest._isRetry = true;
        console.log(originalRequest);
        await store.dispatch(checkAuth());
        if (originalRequest) {
          return api.request(originalRequest);
        }
      } catch (e) {
        console.log("not auth");
      }
    }
    throw error;
  }
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
