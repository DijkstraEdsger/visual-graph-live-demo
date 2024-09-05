import React, { forwardRef, useEffect } from "react";
import MenuItem from "components/atoms/MenuItem";
import Menu from "../Menu";
import Icon from "components/atoms/Icon";
import MenuTrigger from "components/atoms/MenuTrigger";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
};

interface SubMenuProps {
  triggerLabel: string;
  triggerIcon?: React.ReactNode;
  menuItems: TItem[];
  isMainMenu?: boolean;
  menuItemTriggerRef?: React.RefObject<HTMLDivElement>;
  isHighlighted?: boolean;
  onClose?: () => void;
}

const SubMenu = forwardRef<any, SubMenuProps>(
  (
    {
      triggerLabel,
      triggerIcon,
      menuItems,
      isMainMenu,
      menuItemTriggerRef,
      isHighlighted,
      onClose,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const menuRef = React.useRef<HTMLUListElement>(null);
    const triggerRef = React.useRef<HTMLDivElement>(null);
    const submenuContainerRef = React.useRef<HTMLDivElement>(null);
    const menuitemsRefs = React.useRef<HTMLDivElement[]>([]);
    const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);

    useEffect(() => {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
        }
      };

      window.addEventListener("keydown", handleEscape);

      return () => {
        window.removeEventListener("keydown", handleEscape);
      };
    }, []);

    useEffect(() => {
      const handleClickOutside = (e: MouseEvent) => {
        if (open) {
          if (
            // menuRef.current &&
            // triggerRef.current &&
            // !menuRef.current.contains(e.target as Node) &&
            // !triggerRef.current.contains(e.target as Node)
            submenuContainerRef.current &&
            !submenuContainerRef.current.contains(e.target as Node)
          ) {
            // setOpen(false);
            menuRef.current?.focus();
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

    const handleOpen = () => {
      setOpen(true);
    };

    // const handleCloseSubmenu = (event: React.MouseEvent) => {
    //   if (
    //     submenuContainerRef.current &&
    //     !submenuContainerRef.current.contains(event.target as Node)
    //   ) {
    //     setOpen(false);
    //   }
    // };

    const onMouseLeaveHandler = (event: React.MouseEvent) => {
      // console.log('leave', event.target);

      // if (
      //   submenuContainerRef.current &&
      //   !submenuContainerRef.current.contains(event.target as Node)
      // ) {
      //   setOpen(false);
      // }
      setOpen(false);
    };

    const handlePosition = () => {
      const menu = menuRef.current;
      if (menu) {
        const rect = menu.getBoundingClientRect();
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        // Reset styles
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

    const handleMenuitemKeyDown = (e: React.KeyboardEvent) => {
      // when downarrow find the next menuitem and focus it
      if (e.key === "ArrowDown") {
        const nextElement = e.currentTarget.nextElementSibling;
        if (nextElement) {
          (nextElement as HTMLElement).focus();
        }
      }

      // when uparrow find the previous menuitem and focus it
      if (e.key === "ArrowUp") {
        const previousElement = e.currentTarget.previousElementSibling;
        if (previousElement) {
          (previousElement as HTMLElement).focus();
        }
      }

      // when escape close the submenu
    };

    const handleOnClose = () => {
      menuRef.current?.focus();
    };

    const handleMenuKeyDown = (e: React.KeyboardEvent) => {
      // e.stopPropagation();

      switch (e.key) {
        case "ArrowDown":
          e.stopPropagation();
          console.log(
            "menuitemsRefs.current.length - 1",
            menuitemsRefs.current.length - 1
          );

          if (focusedIndex < menuitemsRefs.current.length - 1) {
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
            setFocusedIndex(menuitemsRefs.current.length - 1);
          }

          break;
        case "ArrowRight":
          if (menuItems[focusedIndex]?.items) {
            e.stopPropagation();
            menuitemsRefs.current[focusedIndex].click();
          }
          break;
        case "ArrowLeft":
          e.stopPropagation();
          setOpen(false);
          onClose?.();
          // give the focus back
          


          

          break;
        case "Escape":
          setOpen(false);
          break;
        case "Enter":
          e.stopPropagation();

          if (menuitemsRefs.current[focusedIndex]) {
            console.log(
              "menuitemsRefs.current[focusedIndex]",
              menuitemsRefs.current[focusedIndex]
            );

            menuitemsRefs.current[focusedIndex].click();
          }
          break;

        default:
          break;
      }
      // if (e.key === "ArrowDown") {
      //   const nextElement = menuitemsRefs.current[focusedIndex + 1];
      //   if (nextElement) {
      //     (nextElement as HTMLElement).focus();
      //     setFocusedIndex(focusedIndex + 1);
      //   }
      // }

      // if (e.key === "ArrowUp") {
      //   const previousElement = menuitemsRefs.current[focusedIndex - 1];
      //   if (previousElement) {
      //     (previousElement as HTMLElement).focus();
      //     setFocusedIndex(focusedIndex - 1);
      //   }
      // }

      // if (e.key === "Escape") {
      //   setOpen(false);
      // }
    };

    return (
      <div
        ref={submenuContainerRef}
        style={{
          position: "relative",
        }}
        // onMouseEnter={handlePosition}
        onMouseLeave={onMouseLeaveHandler}
      >
        {isMainMenu ? (
          <MenuTrigger
            onClick={handleOpen}
            aria-haspopup
            aria-expanded={open}
            // ref={menuItemTriggerRef}
            ref={ref}
            // onKeyDown={handleMenuKeyDown}
            isHighlighted={isHighlighted}
          >
            {triggerLabel}
          </MenuTrigger>
        ) : (
          <MenuItem
            // ref={menuItemTriggerRef}
            ref={ref}
            onClick={handleOpen}
            onMouseEnter={handleOpen}
            isHighlighted={isHighlighted}
          >
            {triggerLabel}
            <Icon name="right-arrow" />
          </MenuItem>
        )}

        {open && (
          <Menu
            isMainMenu={isMainMenu}
            ref={menuRef}
            onKeyDown={handleMenuKeyDown}
            tabIndex={-1}
          >
            {menuItems.map((item: TItem, index: number) => {
              if (item.items?.length) {
                return (
                  <SubMenu
                    key={index}
                    triggerLabel={item.label}
                    menuItems={item.items}
                    isHighlighted={focusedIndex === index}
                    // menuItemTriggerRef={
                    //   ((el: HTMLDivElement) => {
                    //     if (el) {
                    //       menuitemsRefs.current.push(el);
                    //     }
                    //   }) as unknown as React.RefObject<HTMLDivElement>
                    // }
                    ref={(el: HTMLDivElement) => {
                      if (el) {
                        menuitemsRefs.current[index] = el;
                      }
                    }}
                    onClose={handleOnClose}
                  />
                );
              }

              return (
                <MenuItem
                  key={index}
                  onClick={item.onClick}
                  // onKeyDown={handleMenuitemKeyDown}
                  // tabIndex={}
                  isHighlighted={focusedIndex === index}
                  ref={(el) => {
                    if (el) {
                      menuitemsRefs.current[index] = el;
                    }
                  }}
                >
                  {item.label}
                </MenuItem>
              );
            })}
          </Menu>
        )}
      </div>
    );
  }
);

export default SubMenu;
