import { createSlice } from "@reduxjs/toolkit";
import { checkAuth, login, logout } from "./authActions";

interface userState {
  isAuth: boolean;
  isLoading: boolean;
}

const initialState: userState = {
  isAuth: false,
  isLoading: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.pending, (state) => {
      state.isLoading = true;
      state.isAuth = false;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      if (action.payload) {
        console.log(action.payload.refreshToken);
        localStorage.setItem("accessToken", action.payload.accessToken);
        localStorage.setItem("refreshToken", action.payload.refreshToken);
      }
    });
    builder.addCase(login.rejected, (state) => {
      state.isLoading = false;
      state.isAuth = false;
    });
    builder.addCase(checkAuth.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isAuth = true;
      if (action.payload) {
        localStorage.setItem("accessToken", action.payload.accessToken);
      }
    });
    builder.addCase(logout.fulfilled, (state) => {
      state.isAuth = false;
      state.isLoading = false;
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
    });
  },
});

// Other code such as selectors can use the imported `RootState` type

export default authSlice.reducer;
