import styles from "../components/TaskInput.module.scss";
import { useState } from "react";

export default function TaskInput({
  onChange,
  userTodosText,
  addTodo,
  setUserTodosText,
}) {
  const [onFocusInput, setOnFocusInput] = useState(false);

  return (
    <>
      <div className={styles.wrapper}>
        <input
          type="text"
          onChange={onChange}
          value={userTodosText}
          placeholder={"Task To Be Done"}
          onFocus={() => setOnFocusInput(true)}
          onBlur={() => {
            setOnFocusInput(false);
            if (!userTodosText.trim()) {
              setUserTodosText("");
            }
          }}
          required
        />
        <button
          onClick={addTodo}
          disabled={
            userTodosText.trim() === "" ||
            userTodosText.length < 2 ||
            userTodosText.length > 65
          }
        >
          Add
        </button>
      </div>
      <div
        className={`${styles.validation} ${onFocusInput ? styles.visible : ""}`}
      >
        {userTodosText.trim() === "" && onFocusInput === true ? (
          <p>Enter the task name</p>
        ) : userTodosText.length < 2 && onFocusInput === true ? (
          <p>Minimum of 2 characters</p>
        ) : userTodosText.length >= 64 && onFocusInput === true ? (
          <p>Maximum of 64 characters</p>
        ) : null}
      </div>
    </>
  );
}
