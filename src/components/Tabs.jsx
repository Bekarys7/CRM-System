import styles from "../components/Tabs.module.scss";

export default function Tabs({ children }) {
  return (
    <>
      <section className={styles.wrapper}>
        <button>{children}</button>
      </section>
    </>
  );
}
