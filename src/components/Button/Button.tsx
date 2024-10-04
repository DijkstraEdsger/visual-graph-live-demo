import React from "react";
import classes from "./classes.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  type?: "button" | "submit" | "reset";
}

const Button: React.FC<ButtonProps> = ({
  onClick,
  children,
  type = "button",
}) => {
  return (
    <button type={type} onClick={onClick} className={classes.button}>
      {children}
    </button>
  );
};

export default Button;
