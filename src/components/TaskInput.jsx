import styles from "../components/TaskInput.module.scss";
import Input from "./input";
// import { useState } from "react";

export default function TaskInput({ onChange, userTodosText, addTodo }) {
  return (
    <div className={styles.wrapper}>
      <Input
        type="text"
        onChange={onChange}
        value={userTodosText}
        placeholder={"Task To Be Done"}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}
