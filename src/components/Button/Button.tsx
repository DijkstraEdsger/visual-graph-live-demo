import React from "react";
import classes from "./classes.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
  disabled,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={classes.button}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
