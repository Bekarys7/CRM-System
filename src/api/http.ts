import type { TabType } from "../types/tab";
import type { Todo } from "../types/Todo";
import type { TodoResponse } from "../types/Todo";

export async function addTodo(todo: Todo) {
  try {
    const response = await fetch("https://easydev.club/api/v1/todos", {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error occurred");
    }
  } catch (error) {
    throw error;
  }
}

export async function fetchTodos(tab: TabType) {
  try {
    const response = await fetch(
      `https://easydev.club/api/v1/todos?filter=${tab}`
    );
    if (!response.ok) {
      throw new Error("Error fetch");
    }
    const resData: TodoResponse = await response.json();
    console.log(resData);
    return resData;
  } catch (error) {
    throw error;
  }
}

export async function deleteTodos(id: number) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error("Error delete");
    }
  } catch (error) {
    throw error;
  }
}

export async function editTodos(
  id: number,
  changes: { title?: string; isDone?: boolean }
) {
  try {
    const response = await fetch(`https://easydev.club/api/v1/todos/${id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(changes),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Error occurred");
    }
  } catch (error) {
    throw error;
  }
}
