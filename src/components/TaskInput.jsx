import styles from "../components/TaskInput.module.scss";

export default function TaskInput({ addTodo, onChange, newTask }) {
  return (
    <div className={styles.wrapper}>
      <input
        onChange={onChange}
        placeholder="Tasks To Be Done"
        value={newTask}
      />
      <button onClick={addTodo}>Add</button>
    </div>
  );
}
