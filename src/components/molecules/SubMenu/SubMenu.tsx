import React from "react";
import Menu from "../Menu";
import Icon from "components/atoms/Icon";
import MenuTrigger from "components/atoms/MenuTrigger";
import "../../../scss/src/atoms/MenuItem.scss";

type TItem = {
  label: string;
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
  onClick?: () => void;
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
  onClose,
  onClick,
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
      className="menuitem-container"
    >
      <MenuTrigger
        onClick={onClick}
        aria-haspopup={menuItems && menuItems?.length > 0}
        aria-expanded={open}
        ref={triggerRef}
        isHighlighted={isHighlighted}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            columnGap: 8,
          }}
        >
          {icon}
          {children}
        </div>
        {!isMainMenu && menuItems && menuItems?.length > 0 && (
          <Icon name="right-arrow" size="20px" />
        )}
      </MenuTrigger>

      {menuItems && (
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
