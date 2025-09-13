import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface UiTodoState {
  editingTodoId: any;
}

const initialState: UiTodoState = {
  editingTodoId: null,
};

export const uiTodoSlice = createSlice({
  name: "uiTodo",
  initialState: initialState,
  reducers: {
    startEditingTodo(state, action) {
      state.editingTodoId = action.payload; // payload = todo.id
    },
    stopEditingTodo(state) {
      state.editingTodoId = null;
    },
  },
});

export const uiTodoActions = uiTodoSlice.actions;

export default uiTodoSlice.reducer;
