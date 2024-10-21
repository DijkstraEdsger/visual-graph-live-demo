import React, { forwardRef } from "react";
import "../../../scss/src/atoms/MenuTrigger.scss";

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
        className={`menu-trigger ${
          isHighlighted ? "menu-trigger--higlighted" : ""
        } ${disabled ? "menu-trigger--disabled" : ""}`}
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
