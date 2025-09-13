import type { TabType } from "../types/tab";
import type { CreateTodo, TodoResponse, Todo, Info } from "../types/Todo";
import axios from "axios";

export async function addTodo(todo: CreateTodo) {
  try {
    await axios.post("https://easydev.club/api/v1/todos", todo);
  } catch (error) {
    throw error;
  }
}

export async function fetchTodos(tab: TabType) {
  try {
    const response = await axios.get<TodoResponse<Todo, Info>>(
      `https://easydev.club/api/v1/todos`,
      { params: { filter: tab } }
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    throw error;
  }
}

export async function deleteTodos(id: number) {
  try {
    await axios.delete(`https://easydev.club/api/v1/todos/${id}`);
  } catch (error) {
    throw error;
  }
}

export async function editTodos(
  id: number,
  changes: { title?: string; isDone?: boolean }
) {
  try {
    await axios.put(`https://easydev.club/api/v1/todos/${id}`, changes);
  } catch (error) {
    throw error;
  }
}
