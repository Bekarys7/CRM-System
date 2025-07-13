import styles from "../components/AddTaskInput.module.scss";
import React, { useState } from "react";
import { addTodo } from "../api/http";

export type UpdateTodos = {
  updateTodos: () => Promise<void>;
};
const AddTaskInput: React.FC<UpdateTodos> = ({ updateTodos }) => {
  const [isClicked, setIsClicked] = useState<boolean>(false);
  const [todoText, setTodoText] = useState<string>("");

  async function addTodoo() {
    try {
      await addTodo({ isDone: false, title: todoText });
      await updateTodos();
      setTodoText("");
    } catch (error) {
      alert(error);
    }
  }
  function handleOnBlur() {
    setIsClicked(false);
    if (!todoText.trim()) {
      setTodoText("");
    }
  }

  function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    const trimText = todoText.trim();
    if (trimText === "" || trimText.length < 2 || trimText.length >= 64) {
      setIsClicked((prev) => (prev ? prev : true));
    } else {
      addTodoo();
      setIsClicked(false);
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            onChange={(event) => setTodoText(event.target.value)}
            value={todoText}
            placeholder={"Task To Be Done"}
            onBlur={handleOnBlur}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      <div
        className={`${styles.validation} ${isClicked ? styles.visible : ""}`}
      >
        {isClicked && todoText.trim() === "" ? (
          <p>Enter the task name</p>
        ) : isClicked && todoText.trim().length < 2 ? (
          <p>Minimum of 2 characters</p>
        ) : isClicked && todoText.trim().length >= 64 ? (
          <p>Maximum of 64 characters</p>
        ) : null}
      </div>
    </>
  );
};

export default AddTaskInput;
