import styles from "../components/TaskInput.module.scss";
// import { useState } from "react";

export default function TaskInput({ onChange, userTodosText, addTodo }) {
  return (
    <div className={styles.wrapper}>
      <input
        type="text"
        required
        placeholder="Task to be done"
        onChange={onChange}
        value={userTodosText}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}
