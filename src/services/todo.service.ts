import type { TabType } from "../types/Tab.types";
import type {
  TodoRequest,
  MetaResponse,
  Todo,
  TodoInfo,
} from "../types/Todo.types";
import { api } from "../api/axios";

export async function addTodo(todo: TodoRequest): Promise<Todo> {
  const { data } = await api.post<Todo>("/todos", todo);
  return data;
}

export async function fetchTodos(
  tab: TabType
): Promise<MetaResponse<Todo, TodoInfo>> {
  const response = await api.get<MetaResponse<Todo, TodoInfo>>(`/todos`, {
    params: { filter: tab },
  });
  return response.data;
}

export async function deleteTodos(id: number): Promise<void> {
  await api.delete(`/todos/${id}`);
}

export async function editTodos(
  id: number,
  changes: TodoRequest
): Promise<Todo> {
  const { data } = await api.put<Todo>(`/todos/${id}`, changes);
  return data;
}
