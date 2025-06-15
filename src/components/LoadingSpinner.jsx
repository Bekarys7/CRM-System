import styles from "../components/LoadingSpinner.module.scss";

export default function LoadingSpinner() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.loadingSpinner} />{" "}
    </div>
  );
}
