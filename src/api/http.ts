import type { TabType } from "../types/tab";
import type { CreateTodo, TodoResponse, Todo, Info } from "../types/Todo";
import { api } from "./axios";

export async function addTodo(todo: CreateTodo) {
  await api.post("/todos", todo);
}

export async function fetchTodos(tab: TabType) {
  const response = await api.get<TodoResponse<Todo, Info>>(`/todos`, {
    params: { filter: tab },
  });
  return response.data;
}

export async function deleteTodos(id: number) {
  await api.delete(`/todos/${id}`);
}

export async function editTodos(
  id: number,
  changes: { title?: string; isDone?: boolean }
) {
  await api.put(`/todos/${id}`, changes);
}
