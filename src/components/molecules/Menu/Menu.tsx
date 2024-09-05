import React, { forwardRef } from "react";
import "../../../scss/src/molecules/Menu.scss";

interface MenuProps extends React.HTMLProps<HTMLUListElement> {
  children: React.ReactNode;
  isMainMenu?: boolean;
  // props?: React.HTMLProps<HTMLUListElement>;
}

const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ children, isMainMenu, ...props }, ref) => {
    // const onKeyDownHandler = (e: React.KeyboardEvent) => {
    //   if (e.key === "Escape") {
    //     // setOpen(false);
    //   }

    //   if (e.key === "ArrowDown") {
    //     // focus next item
    //     const nextElement = e.currentTarget.nextElementSibling;
    //     if (nextElement) {
    //       (nextElement as HTMLElement).focus();
    //     }
    //   }

    //   if (e.key === "ArrowUp") {
    //     // focus previous item
    //     const previousElement = e.currentTarget.previousElementSibling;
    //     if (previousElement) {
    //       (previousElement as HTMLElement).focus();
    //     }
    //   }

    //   if (e.key === "Enter") {
    //     // trigger click event
    //   }
    // };

    return (
      <ul
        ref={ref}
        role="menu"
        {...props}
        className={`menu ${isMainMenu ? "main-menu" : "sub-menu"}`}
        // tabIndex={0}
        // onKeyDown={onKeyDownHandler}
      >
        {children}
      </ul>
    );
  }
);

export default Menu;
