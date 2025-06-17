import styles from "../components/IconButton.module.scss";

export default function IconButton({
  children,
  variant = "primary",
  onClick,
  type = "button",
}) {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconButton} ${styles[variant]}`}
      type={type}
    >
      {children}
    </button>
  );
}
