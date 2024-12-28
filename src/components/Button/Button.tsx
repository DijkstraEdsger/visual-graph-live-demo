import React, { forwardRef } from "react";
import classes from "./classes.module.scss";

type ButtonColor = "primary" | "secondary" | "error";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  color?: ButtonColor;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      onClick,
      children,
      type = "button",
      disabled,
      className,
      color = "primary",
    },
    ref
  ) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${classes.button} ${
          color === "error" ? classes["button--error"] : ""
        } ${className}`}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
