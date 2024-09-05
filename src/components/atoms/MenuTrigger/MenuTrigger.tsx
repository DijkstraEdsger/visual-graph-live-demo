import React, { forwardRef } from "react";
import "../../../scss/src/atoms/MenuTrigger.scss";

interface MenuTriggerProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  isHighlighted?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const MenuTrigger = forwardRef<HTMLDivElement, MenuTriggerProps>(
  ({ children, isHighlighted, onClick, onKeyDown, ...rest }, ref) => {
    return (
      <div
        ref={ref}
        role="menuitem"
        className={`menu-trigger ${isHighlighted ? "menu-trigger--higlighted" : ""}`}
        onClick={onClick}
        tabIndex={0}
        onKeyDown={onKeyDown}
        
        // aria-expanded={}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default MenuTrigger;
