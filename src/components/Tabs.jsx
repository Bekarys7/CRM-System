import styles from "../components/Tabs.module.scss";
import Task from "./Task";

export default function Tabs({ children, userTasks, isActive, onSelect }) {
  return (
    <>
      <section onSelect className={styles.wrapper}>
        <button
          onClick={onSelect}
          className={isActive ? styles.active : undefined}
        >
          {children}
        </button>
      </section>
    </>
  );
}
