import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout } from "./authActions";

interface userState {
  isAuth: boolean;
  status: "pending" | "authenticated" | "unauthenticated";
  token: string | null;
}

const initialState: userState = {
  isAuth: false,
  status: "unauthenticated",
  token: null,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.status = "pending";
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.status = "authenticated";
      state.isAuth = true;
      if (action.payload) {
        state.token = action.payload.accessToken;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.status = "unauthenticated";
      state.isAuth = false;
      state.token = null;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.status = "authenticated";
      state.isAuth = true;
      if (action.payload?.accessToken) {
        state.token = action.payload.accessToken;
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
    builder.addCase(checkAuth.rejected, (state) => {
      state.status = "unauthenticated";
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem("refreshToken");
    });
    builder.addCase(logout.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.token = null;
      localStorage.removeItem("refreshToken");
      state.status = "unauthenticated";
    });
  },
});

// export const { toggleIsLoading } = authSlice.actions;

export default authSlice.reducer;
