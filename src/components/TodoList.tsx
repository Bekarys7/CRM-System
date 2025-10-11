import TodoItem from "./TodoItem";
import type { Todo, UpdateTodos } from "../types/Todo.types";
import React, { useMemo } from "react";
type TodoList = { toDoArray: Todo[]; updateTodos: UpdateTodos };

const TodoList: React.FC<TodoList> = ({ toDoArray, updateTodos }) => {
  const reversedToDoArray = useMemo(() => {
    return [...toDoArray].reverse();
  }, [toDoArray]);

  return reversedToDoArray.map((todo) => {
    return <TodoItem key={todo.id} todo={todo} updateTodos={updateTodos} />;
  });
};
export default React.memo(TodoList);
