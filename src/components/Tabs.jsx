import styles from "../components/Tabs.module.scss";
import Task from "./Task";

export default function Tabs({ children }) {
  return (
    <>
      <section className={styles.wrapper}>
        <button>{children}</button>
      </section>
    </>
  );
}
