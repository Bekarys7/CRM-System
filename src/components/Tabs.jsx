import styles from "../components/Tabs.module.scss";
import Task from "./Task";

export default function Tabs({ children, onChange }) {
  return (
    <>
      <section className={styles.wrapper}>
        <button onClick={onChange}>{children}</button>
      </section>
    </>
  );
}
