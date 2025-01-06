import React, { forwardRef } from "react";
import classes from "./classes.module.scss";

interface MenuTriggerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  isHighlighted?: boolean;
  disabled?: boolean;
  isRootMenuTrigger?: boolean;
  onClick?: () => void;
}

const MenuTrigger = forwardRef<HTMLDivElement, MenuTriggerProps>(
  (
    { children, isHighlighted, onClick, disabled, isRootMenuTrigger, ...rest },
    ref
  ) => {
    return isRootMenuTrigger ? (
      <div
        ref={ref}
        role="menuitem"
        className={`${classes["menu-trigger-root"]} ${
          isHighlighted ? classes["menu-trigger-root--highlighted"] : ""
        } ${disabled ? classes["menu-trigger-root--disabled"] : ""}`}
        onClick={onClick}
        tabIndex={0}
        aria-disabled={disabled}
        {...rest}
      >
        {children}
      </div>
    ) : (
      <div
        ref={ref}
        role="menuitem"
        className={`${classes["menu-trigger"]} ${
          isHighlighted ? classes["menu-trigger--highlighted"] : ""
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
