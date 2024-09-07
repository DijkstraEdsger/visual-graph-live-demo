import React, { forwardRef, useEffect } from "react";
import Menu from "../Menu";
import Icon from "components/atoms/Icon";
import MenuTrigger from "components/atoms/MenuTrigger";
import "../../../scss/src/atoms/MenuItem.scss";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
};

interface ManuItemProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  triggerIcon?: React.ReactNode;
  menuItems?: TItem[];
  isMainMenu?: boolean;
  menuItemTriggerRef?: React.RefObject<HTMLDivElement>;
  isHighlighted?: boolean;
  isMenubarExpanded?: boolean;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClose?: () => void;
}

const MenuItem = forwardRef<any, ManuItemProps>(
  (
    {
      children,
      menuItems,
      isMainMenu,
      isHighlighted,
      isMenubarExpanded,
      onClose,
      onClick,
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);

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

    const handleOpen = () => {
      setOpen(true);
      onClick?.();
    };

    const onMouseLeaveHandler = (event: React.MouseEvent) => {
      setOpen(false);
      onClose?.();
    };

    const handleOnClose = () => {
      // menuRef.current?.focus();
      setOpen(false);
      onClose?.();
    };

    const onMouseEnterHandler = (e: React.MouseEvent) => {
      setOpen(true);
    };

    return (
      <li
        // ref={submenuContainerRef}
        role="none"
        style={{
          position: "relative",
        }}
        className="menuitem-container"
        onMouseLeave={onMouseLeaveHandler}
      >
        <MenuTrigger
          onClick={handleOpen}
          onMouseEnter={onMouseEnterHandler}
          aria-haspopup={menuItems && menuItems?.length > 0}
          aria-expanded={open}
          ref={ref}
          isHighlighted={isHighlighted}
        >
          {children}
          {!isMainMenu && menuItems && menuItems?.length > 0 && (
            <Icon name="right-arrow" />
          )}
        </MenuTrigger>

        <Menu
          open={open && menuItems && menuItems?.length > 0}
          isMainMenu={isMainMenu}
          menuItems={menuItems}
          onClose={handleOnClose}
        />
      </li>
    );
  }
);

export default MenuItem;
