import React from "react";
import styles from "../components/IconButton.module.scss";

type IconButtonProps = {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "danger";
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: "button" | "submit" | "reset";
};

const IconButton: React.FC<IconButtonProps> = ({
  children,
  variant = "primary",
  onClick,
  type = "button",
}) => {
  return (
    <button
      onClick={onClick}
      className={`${styles.iconButton} ${styles[variant]}`}
      type={type}
    >
      {children}
    </button>
  );
};

export default IconButton;
