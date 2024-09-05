import React, { forwardRef } from "react";
import "../../../scss/src/atoms/MenuItem.scss";

interface MenuItemProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  isHighlighted?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
}

const MenuItem = forwardRef<HTMLDivElement, MenuItemProps>(
  (
    {
      children,
      isHighlighted,
      onClick,
      onMouseEnter,
      onMouseLeave,
      onKeyDown,
      ...rest
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        role="menuitem"
        className={`menuitem ${isHighlighted ? "menuitem--highlighted" : ""}`}
        onClick={onClick}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onKeyDown={onKeyDown}
        tabIndex={0}
        {...rest}
      >
        {children}
      </div>
    );
  }
);

export default MenuItem;
