import React, { forwardRef, useEffect } from "react";
import "../../../scss/src/molecules/Menu.scss";
import MenuItem from "../SubMenu/SubMenu";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
};

interface MenuProps extends React.HTMLProps<HTMLUListElement> {
  children?: React.ReactNode;
  open?: boolean;
  isMainMenu?: boolean;
  menuItems?: TItem[];
  onClose?: () => void;
}

const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ children, open, isMainMenu, menuItems = [], onClose, ...props }, ref) => {
    const menuitemsRefs = React.useRef<HTMLDivElement[]>([]);
    const menuRef = React.useRef<HTMLUListElement>(null);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
    const [openIndex, setOpenIndex] = React.useState<number>(-1);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (open) {
          if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            setOpenIndex(-1);
          }
        }
      };

      window.addEventListener("click", handleClickOutside);

      if (open) {
        handlePosition();
        menuRef.current?.focus();
      }

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [open]);

    const handlePosition = () => {
      const menu = menuRef.current;
      if (menu) {
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        menu.style.left = "";
        menu.style.top = "";

        // Check if the menu is out of the viewport and adjust its position
        if (rect.right > viewportWidth) {
          menu.style.left = `-${rect.width}px`;
        }

        if (rect.bottom > viewportHeight) {
          menu.style.top = `-${rect.height}px`;
        }
      }
    };

    useEffect(() => {
      const handlePosition = () => {
        const menu = menuRef.current;
        if (menu) {
          const rect = menu.getBoundingClientRect();
          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          // Check if the menu is out of the viewport and adjust its position
          if (rect.right > viewportWidth) {
            menu.style.left = `-${rect.width}px`;
          }
          if (rect.bottom > viewportHeight) {
            menu.style.top = `-${rect.height}px`;
          }
        }
      };

      handlePosition();
      window.addEventListener("resize", handlePosition);

      return () => {
        window.removeEventListener("resize", handlePosition);
      };
    }, []);

    if (!open) {
      return null;
    }

    const handleOnClick = (item: TItem, index: number) => {
      setFocusedIndex(index);
      setOpenIndex(index);
      item.onClick?.();
    };

    return (
      <ul
        role="menu"
        {...props}
        className={`menu ${isMainMenu ? "main-menu" : "sub-menu"}`}
        tabIndex={0}
        ref={menuRef}
      >
        {menuItems?.map((item: TItem, index: number) => {
          return (
            <MenuItem
              key={index}
              menuItems={item.items || []}
              isHighlighted={focusedIndex === index}
              ref={(el: HTMLDivElement) => {
                if (el) {
                  menuitemsRefs.current[index] = el;
                }
              }}
              onClick={() => handleOnClick(item, index)}
              open={openIndex === index}
            >
              {item.label}
            </MenuItem>
          );
        })}
      </ul>
    );
  }
);

export default Menu;
