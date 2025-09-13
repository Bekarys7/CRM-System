import { configureStore } from "@reduxjs/toolkit";
import uiTodoSlice from "./uiTodo-slice";
import todoSlice from "./todo-slice";

export const store = configureStore({
  reducer: { ui: uiTodoSlice, todo: todoSlice },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
