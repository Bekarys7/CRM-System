import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout } from "./authActions";

interface userState {
  isAuth: boolean;
  isLoading: boolean;
  token: string | null;
}

const initialState: userState = {
  isAuth: false,
  isLoading: true,
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    toggleIsLoading: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      if (action.payload) {
        state.token = action.payload.accessToken;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      if (action.payload?.accessToken) {
        state.token = action.payload.accessToken;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
      state.token = null;
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.token = null;
      state.isLoading = false;
      localStorage.removeItem("refreshToken");
    });
    builder.addCase(logout.pending, (state) => {
      state.isLoading = false;
    });
  },
});

export const { toggleIsLoading } = authSlice.actions;

export default authSlice.reducer;
