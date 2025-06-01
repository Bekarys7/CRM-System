import styles from "../components/Tabs.module.scss";
import Task from "./Task";

export default function Tabs({}) {
  return (
    <>
      <section className={styles.wrapper}>
        <p>Все</p>
        <p>в работе(24)</p>
        <p>сделано(44)</p>
      </section>
      <Task />
    </>
  );
}
