import styles from "../components/AddTaskInput.module.scss";
import { useState } from "react";
import { addTodo } from "../api/http";

export default function AddTaskInput({
  onChange,
  todoText,
  setTodoText,
  updateTodos,
}) {
  const [isClicked, setIsClicked] = useState(false);

  async function AddTodo() {
    try {
      await addTodo({ isDone: false, title: todoText });
      await updateTodos();
    } catch (error) {
      console.log(error);
    } finally {
      setTodoText("");
    }
  }
  function handleOnBlur() {
    setIsClicked(false);
    if (!todoText.trim()) {
      setTodoText("");
    }
  }

  function handleAddTodo() {
    const trimText = todoText.trim();
    if (trimText === "" || trimText.length < 2 || trimText.length >= 64) {
      setIsClicked((prev) => (prev ? prev : true));
    } else {
      AddTodo();
      setIsClicked(false);
    }
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form>
          <input
            type="text"
            onChange={onChange}
            value={todoText}
            placeholder={"Task To Be Done"}
            onBlur={handleOnBlur}
            required
          />
        </form>
        <button onClick={handleAddTodo}>Add</button>
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
}
