import Icon from "components/Icon";
import React, { ReactNode } from "react";
import Menu from "../Menu";
import MenuTrigger from "../MenuTrigger";
import classes from "./classes.module.scss";

type TItem = {
  label: string | ReactNode;
  onClick?: () => void;
  items?: TItem[];
};

interface MenuItemProps extends React.HTMLProps<HTMLDivElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  menuItems?: TItem[];
  isMainMenu?: boolean;
  menuItemTriggerRef?: React.RefObject<HTMLDivElement>;
  isHighlighted?: boolean;
  isMenubarExpanded?: boolean;
  open?: boolean;
  disabled?: boolean;
  isRootMenuTrigger?: boolean;
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: (event: React.MouseEvent) => void;
  onKeyDown?: (event: React.KeyboardEvent) => void;
  onClose?: () => void;
  onKeyDownArrowLeft?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  children,
  icon,
  menuItems,
  isMainMenu,
  isHighlighted,
  isMenubarExpanded,
  open,
  disabled = false,
  isRootMenuTrigger,
  onClose,
  onClick,
  onMouseOver,
  onKeyDownArrowLeft,
}) => {
  const triggerRef = React.useRef<HTMLDivElement>(null);

  if (!menuItems?.length && open) {
    triggerRef?.current?.focus();
  }

  return (
    <li
      role="none"
      style={{
        position: "relative",
      }}
      className={classes["menuitem-container"]}
    >
      <MenuTrigger
        onClick={onClick}
        onMouseOver={onMouseOver}
        aria-haspopup={menuItems && menuItems?.length > 0}
        aria-expanded={open}
        ref={triggerRef}
        isHighlighted={isHighlighted}
        disabled={disabled}
        isRootMenuTrigger={isRootMenuTrigger}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            columnGap: 8,
            width: "100%",
          }}
        >
          {icon}
          {children}
        </div>
        {!isMainMenu && menuItems && menuItems?.length > 0 && (
          <Icon name="right-arrow" size="20px" />
        )}
      </MenuTrigger>

      {menuItems && open && (
        <Menu
          open={open}
          isMainMenu={isMainMenu}
          menuItems={menuItems}
          onKeyDownArrowLeft={onKeyDownArrowLeft}
          onClose={onClose}
        />
      )}
    </li>
  );
};

export default MenuItem;
