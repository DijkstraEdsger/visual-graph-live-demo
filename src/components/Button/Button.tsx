import React, { forwardRef } from "react";
import classes from "./classes.module.scss";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ onClick, children, type = "button", disabled, className }, ref) => {
    return (
      <button
        type={type}
        onClick={onClick}
        className={`${classes.button} ${className}`}
        disabled={disabled}
        ref={ref}
      >
        {children}
      </button>
    );
  }
);

export default Button;
