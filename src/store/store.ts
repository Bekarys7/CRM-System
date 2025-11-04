import { configureStore } from "@reduxjs/toolkit";
import slice from "./authSlice";
// ...

export const store = configureStore({
  reducer: { slice: slice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
