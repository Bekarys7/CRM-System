import type { TabType } from "../types/Tab.types";
import type { CreateTodo, TodoResponse, Todo, Info } from "../types/Todo.types";
import { api } from "./axios";

export async function addTodo(todo: CreateTodo): Promise<Todo> {
  const response = await api.post<Todo>("/todos", todo, {
    withCredentials: true,
  });
  console.log(response);
  return response.data;
}

export async function fetchTodos(
  tab: TabType
): Promise<TodoResponse<Todo, Info>> {
  const response = await api.get<TodoResponse<Todo, Info>>(`/todos`, {
    params: { filter: tab },
  });
  return response.data;
}

export async function deleteTodos(id: number): Promise<void> {
  await api.delete(`/todos/${id}`);
}

export async function editTodos(
  id: number,
  changes: CreateTodo
): Promise<Todo> {
  const { data } = await api.put<Todo>(`/todos/${id}`, changes);
  return data;
}
