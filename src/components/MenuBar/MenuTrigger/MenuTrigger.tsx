import React, { forwardRef } from "react";
import classes from "./classes.module.scss";

interface MenuTriggerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  isHighlighted?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

const MenuTrigger = forwardRef<HTMLDivElement, MenuTriggerProps>(
  ({ children, isHighlighted, onClick, disabled, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="menuitem"
        className={`${classes["menu-trigger"]} ${
          isHighlighted ? classes["menu-trigger--higlighted"] : ""
        } ${disabled ? classes["menu-trigger--disabled"] : ""}`}
        onClick={onClick}
        tabIndex={0}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default MenuTrigger;
