import styles from "../components/AddTaskInput.module.scss";
import { useState } from "react";
import { SendUserTodos } from "../api/http";

export default function AddTaskInput({
  onChange,
  userTodosText,
  handlefetchUserTodos,
  setUserTodosText,
}) {
  const [onFocusInput, setOnFocusInput] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  async function handleAddUserTodos() {
    const newTodo = { isDone: false, title: userTodosText };

    try {
      await SendUserTodos(newTodo);
      handlefetchUserTodos();
    } catch (error) {
      console.log(error);
    }
    setUserTodosText("");
  }

  return (
    <>
      <div className={styles.wrapper}>
        <form>
          <input
            type="text"
            onChange={onChange}
            value={userTodosText}
            placeholder={"Task To Be Done"}
            onFocus={() => setOnFocusInput(true)}
            onBlur={() => {
              setOnFocusInput(false);
              setIsClicked(false);
              if (!userTodosText.trim()) {
                setUserTodosText("");
              }
            }}
            required
          />
        </form>
        <button
          onClick={() => {
            const trimText = userTodosText.trim();
            if (
              trimText === "" ||
              trimText.length < 2 ||
              trimText.length >= 64
            ) {
              setIsClicked((prev) => (prev ? prev : true));
            } else {
              handleAddUserTodos();
              setIsClicked(false);
            }
          }}
        >
          Add
        </button>
      </div>
      <div
        className={`${styles.validation} ${
          onFocusInput || isClicked ? styles.visible : ""
        }`}
      >
        {(onFocusInput || isClicked) && userTodosText.trim() === "" ? (
          <p>Enter the task name</p>
        ) : (onFocusInput || isClicked) && userTodosText.trim().length < 2 ? (
          <p>Minimum of 2 characters</p>
        ) : (onFocusInput || isClicked) && userTodosText.trim().length >= 64 ? (
          <p>Maximum of 64 characters</p>
        ) : null}
      </div>
    </>
  );
}
