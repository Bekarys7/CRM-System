import { useState } from "react";
import deleteIcon from "../assets/delete.svg";
import editIcon from "../assets/editIcon.svg";
import styles from "../components/TodoList.module.scss";
import TodoItem from "./TodoItem";

export default function TodoList({
  userToDos,
  deleteTask,
  editTask,
  toggleCheckBox,
  setUserToDos,
  handlefetchUserTodos,
}) {
  return userToDos.map((item) => {
    return (
      <div key={item.id}>
        <TodoItem
          item={item}
          editTask={editTask}
          toggleCheckBox={toggleCheckBox}
          setUserToDos={setUserToDos}
          handlefetchUserTodos={handlefetchUserTodos}
        />
      </div>
    );
  });
}
