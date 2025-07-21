import styles from "../components/AddTaskInput.module.scss";
import React, { useState } from "react";
import { addTodo } from "../api/http";

export type UpdateTodos = {
  updateTodos: () => Promise<void>;
};

const AddTaskInput: React.FC<UpdateTodos> = ({ updateTodos }) => {
  const [todoText, setTodoText] = useState<string>("");
  const [error, setError] = useState<string>("");

  async function addTodoo() {
    try {
      await addTodo({ isDone: false, title: todoText.trim() });
      await updateTodos();
      setTodoText("");
      setError("");
    } catch (error) {
      alert(error);
    }
  }

  function handleOnBlur() {
    if (!todoText.trim()) {
      setTodoText("");
    }
  }

  function handleAddTodo(e: React.FormEvent) {
    e.preventDefault();
    const trimText = todoText.trim();

    if (trimText === "") {
      setError("Enter the task name");
    } else if (trimText.length < 2) {
      setError("Minimum of 2 characters");
    } else if (trimText.length >= 64) {
      setError("Maximum of 64 characters");
    } else {
      addTodoo();
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form onSubmit={handleAddTodo}>
          <input
            type="text"
            value={todoText}
            placeholder="Task To Be Done"
            onChange={(event) => {
              setTodoText(event.target.value);
              setError("");
            }}
            onBlur={handleOnBlur}
          />
          <button type="submit">Add</button>
        </form>
      </div>
      {error && (
        <div className={styles.validation}>
          <p>{error}</p>
        </div>
      )}
    </>
  );
};

export default AddTaskInput;
