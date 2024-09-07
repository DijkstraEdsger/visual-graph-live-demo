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
  // props?: React.HTMLProps<HTMLUListElement>;
}

const Menu = forwardRef<HTMLUListElement, MenuProps>(
  ({ children, open, isMainMenu, menuItems = [], onClose, ...props }, ref) => {
    const menuitemsRefs = React.useRef<HTMLDivElement[]>([]);
    const menuRef = React.useRef<HTMLUListElement>(null);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (open) {
          // if (
          //   submenuContainerRef.current &&
          //   !submenuContainerRef.current.contains(e.target as Node)
          // ) {
          //   menuRef.current?.focus();
          // }
          if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
            onClose?.();
          }
        }
      };

      window.addEventListener("click", handleClickOutside);

      if (open) {
        handlePosition();
        menuRef.current?.focus();
        console.log("menu focus");
      }

      return () => {
        window.removeEventListener("click", handleClickOutside);
      };
    }, [open]);

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

    const handleMenuKeyDown = (e: React.KeyboardEvent) => {
      switch (e.key) {
        case "ArrowDown":
          e.stopPropagation();
          // console.log(
          //   "menuitemsRefs.current.length - 1",
          //   menuitemsRefs.current.length - 1
          // );

          if (focusedIndex < menuItems.length - 1) {
            setFocusedIndex(focusedIndex + 1);
          } else {
            setFocusedIndex(0);
          }

          break;
        case "ArrowUp":
          e.stopPropagation();

          if (focusedIndex > 0) {
            setFocusedIndex(focusedIndex - 1);
          } else {
            setFocusedIndex(menuItems.length - 1);
          }

          break;
        case "ArrowRight":
          if (menuItems?.[focusedIndex]?.items) {
            e.stopPropagation();
            menuitemsRefs.current[focusedIndex].click();
          }
          break;
        case "ArrowLeft":
          e.stopPropagation();
          // setOpen(false);
          onClose?.();

          break;
        case "Escape":
          // setOpen(false);
          break;
        case "Enter":
          e.stopPropagation();

          if (menuitemsRefs.current[focusedIndex]) {
            // console.log(
            //   "menuitemsRefs.current[focusedIndex]",
            //   menuitemsRefs.current[focusedIndex]
            // );

            menuitemsRefs.current[focusedIndex].click();
          }
          break;

        default:
          break;
      }
    };

    if (!open) {
      return null;
    }

    const handleOnCloseSubmenu = () => {
      menuRef.current?.focus();
    };

    return (
      <ul
        role="menu"
        {...props}
        className={`menu ${isMainMenu ? "main-menu" : "sub-menu"}`}
        tabIndex={0}
        // onKeyDown={onKeyDownHandler}
        onKeyDown={handleMenuKeyDown}
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
              // onClose={handleOnClose}
              onClick={item.onClick}
              // isMenubarExpanded={isMenubarExpanded}
              onClose={handleOnCloseSubmenu}
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
