import styles from "../components/Tab.module.scss";

export default function Tabs({ children, onChange, isSelected }) {
  return (
    <>
      <div className={styles.wrapper}>
        <button
          className={isSelected ? styles.active : undefined}
          onClick={onChange}
        >
          {children}
        </button>
      </div>
    </>
  );
}
