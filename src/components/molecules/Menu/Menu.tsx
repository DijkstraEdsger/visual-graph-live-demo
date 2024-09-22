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
  onKeyDownArrowLeft?: () => void;
}

const Menu = forwardRef<HTMLUListElement, MenuProps>(
  (
    {
      children,
      open,
      isMainMenu,
      menuItems = [],
      onClose,
      onKeyDownArrowLeft,
      ...props
    },
    ref
  ) => {
    const menuitemsRefs = React.useRef<HTMLDivElement[]>([]);
    const menuRef = React.useRef<HTMLUListElement>(null);
    const [openIndex, setOpenIndex] = React.useState<number>(-1);
    const [higlightedIndex, setHiglightedIndex] = React.useState<number>(-1);

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
      setOpenIndex(index);
      item.onClick?.();
    };

    const onKeyDownHandler = (e: React.KeyboardEvent) => {
      const key = e.key;

      switch (key) {
        case "ArrowDown":
          e.stopPropagation();

          if (higlightedIndex < menuItems?.length - 1) {
            setHiglightedIndex(higlightedIndex + 1);
          } else {
            setHiglightedIndex(0);
          }
          break;
        case "ArrowUp":
          e.stopPropagation();

          if (higlightedIndex > 0) {
            setHiglightedIndex(higlightedIndex - 1);
          } else {
            setHiglightedIndex(menuItems?.length - 1);
          }
          break;
        case "Enter":
          e.stopPropagation();
          handleOnClick(menuItems[higlightedIndex], higlightedIndex);
          break;
        case "ArrowRight":
          if (menuItems[higlightedIndex]?.items) {
            e.stopPropagation();
            handleOnClick(menuItems[higlightedIndex], higlightedIndex);
          }
          break;
        case "ArrowLeft":
          if (onKeyDownArrowLeft) {
            e.stopPropagation();
            onKeyDownArrowLeft?.();
          }

          break;
        default:
          break;
      }
    };

    const onKeyDownArrowLeftHandler = () => {
      // close opened submenu
      setOpenIndex(-1);
      menuRef.current?.focus();
    };

    return (
      <ul
        role="menu"
        {...props}
        className={`menu ${isMainMenu ? "main-menu" : "sub-menu"}`}
        tabIndex={0}
        ref={menuRef}
        onKeyDown={onKeyDownHandler}
      >
        {menuItems?.map((item: TItem, index: number) => {
          return (
            <MenuItem
              key={index}
              menuItems={item.items || []}
              isHighlighted={higlightedIndex === index}
              ref={(el: HTMLDivElement) => {
                if (el) {
                  menuitemsRefs.current[index] = el;
                }
              }}
              onClick={() => handleOnClick(item, index)}
              open={openIndex === index}
              onKeyDownArrowLeft={onKeyDownArrowLeftHandler}
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
