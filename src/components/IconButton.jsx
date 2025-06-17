import styles from "../components/IconButton.module.scss";

export default function IconButton({ children, variant = "primary", onClick }) {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconButton} ${styles[variant]}`}
    >
      {children}
    </button>
  );
}
