import React, { ReactNode, useEffect } from "react";
import { motion } from "framer-motion";
import classes from "./classes.module.scss";
import MenuItem from "../MenuItem";

type TItem = {
  label: string | ReactNode;
  onClick?: () => void;
  items?: TItem[];
  icon?: React.ReactNode;
  disabled?: boolean;
};

interface MenuProps extends React.HTMLProps<HTMLUListElement> {
  children?: React.ReactNode;
  open?: boolean;
  isMainMenu?: boolean;
  menuItems?: TItem[];
  onClose?: () => void;
  onKeyDownArrowLeft?: () => void;
}

const Menu: React.FC<MenuProps> = (
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
  const menuRef = React.useRef<HTMLUListElement>(null);
  const [openIndex, setOpenIndex] = React.useState<number>(-1);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);

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
    const isAction = !item.items?.length;

    if (isAction) {
      onClose?.();
      onKeyDownArrowLeft?.();
    } else {
      setOpenIndex(index);
    }

    setHighlightedIndex(index);
    item?.onClick?.();
  };

  const handleOnMouseOver = (index: number) => {
    setOpenIndex(index);
    setHighlightedIndex(index);
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    const key = e.key;

    switch (key) {
      case "ArrowDown":
        e.stopPropagation();

        if (highlightedIndex < menuItems?.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
        } else {
          setHighlightedIndex(0);
        }
        break;
      case "ArrowUp":
        e.stopPropagation();

        if (highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
        } else {
          setHighlightedIndex(menuItems?.length - 1);
        }
        break;
      case "Enter":
        e.stopPropagation();
        handleOnClick(menuItems[highlightedIndex], highlightedIndex);
        break;
      case "ArrowRight":
        if (menuItems[highlightedIndex]?.items) {
          e.stopPropagation();
          handleOnClick(menuItems[highlightedIndex], highlightedIndex);
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
    <motion.ul
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      role="menu"
      className={`${classes.menu} ${
        isMainMenu ? classes["main-menu"] : classes["sub-menu"]
      }`}
      tabIndex={0}
      ref={menuRef}
      onKeyDown={onKeyDownHandler}
    >
      {menuItems?.map((item: TItem, index: number) => {
        return (
          <MenuItem
            key={index}
            menuItems={item.items}
            isHighlighted={highlightedIndex === index}
            onClick={() => handleOnClick(item, index)}
            onMouseOver={() => handleOnMouseOver(index)}
            open={openIndex === index}
            onKeyDownArrowLeft={onKeyDownArrowLeftHandler}
            icon={item.icon}
            disabled={item.disabled}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </motion.ul>
  );
};

export default Menu;
