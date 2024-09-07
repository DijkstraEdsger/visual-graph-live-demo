import React, { forwardRef } from "react";
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
  open?: boolean;
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
      open,
      onClose,
      onClick,
    },
    ref
  ) => {
    return (
      <li
        role="none"
        style={{
          position: "relative",
        }}
        className="menuitem-container"
      >
        <MenuTrigger
          onClick={onClick}
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

        <Menu open={open} isMainMenu={isMainMenu} menuItems={menuItems} />
      </li>
    );
  }
);

export default MenuItem;
