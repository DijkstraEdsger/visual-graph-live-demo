import React from "react";
import classes from "./classes.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  disabled,
  className,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${classes.button} ${className}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
