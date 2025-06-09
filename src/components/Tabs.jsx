import styles from "../components/Tabs.module.scss";

export default function Tabs({ children, onChange, isSelected }) {
  return (
    <>
      <section className={styles.wrapper}>
        <button
          className={isSelected ? styles.active : undefined}
          onClick={onChange}
        >
          {children}
        </button>
      </section>
    </>
  );
}
