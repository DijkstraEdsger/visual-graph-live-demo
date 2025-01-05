import React, { ReactNode, useEffect } from "react";
import classes from "./classes.module.scss";
import MenuItem from "./MenuItem";

type TItem = {
  label: string | ReactNode;
  onClick?: () => void;
  items?: TItem[];
  disabled?: boolean;
};

interface MenubarProps {
  props?: React.HTMLProps<HTMLDivElement>;
  menus?: TItem[];
}

const MenuBar: React.FC<MenubarProps> = ({ menus = [], ...props }) => {
  const menubarRef = React.useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = React.useState<number>(-1);
  const [highlightedIndex, setHighlightedIndex] = React.useState<number>(-1);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openIndex >= 0) {
        if (
          menubarRef.current &&
          !menubarRef.current.contains(e.target as Node)
        ) {
          setOpenIndex(-1);
          setHighlightedIndex(-1);
        }
      }
    };

    window.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, [openIndex]);

  useEffect(() => {
    if (
      openIndex >= 0 &&
      highlightedIndex >= 0 &&
      highlightedIndex !== openIndex
    ) {
      onClickHandler(menus[highlightedIndex], highlightedIndex);
    }
  }, [highlightedIndex, openIndex, menus]);

  const onClickHandler = (item: TItem, index = -1) => {
    setOpenIndex(index);
    setHighlightedIndex(index);
    item?.onClick?.();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    const key = e.key;

    switch (key) {
      case "ArrowRight":
        if (highlightedIndex < menus?.length - 1) {
          setHighlightedIndex(highlightedIndex + 1);
        } else {
          setHighlightedIndex(0);
        }

        break;
      case "ArrowLeft":
        if (highlightedIndex > 0) {
          setHighlightedIndex(highlightedIndex - 1);
        } else {
          setHighlightedIndex(menus?.length - 1);
        }

        break;
      case "Enter":
        onClickHandler(menus[highlightedIndex], highlightedIndex);
        break;

      default:
        break;
    }
  };

  const handleOnMouseOver = (index: number) => {
    if (openIndex !== -1) {
      setOpenIndex(index);
      setHighlightedIndex(index);
    }
  };

  return (
    <div
      role="menubar"
      {...props}
      className={classes.menubar}
      tabIndex={0}
      ref={menubarRef}
      onKeyDown={onKeyDownHandler}
    >
      {menus?.map((item: TItem, index: number) => {
        return (
          <MenuItem
            key={index}
            menuItems={item.items}
            isMainMenu
            onClick={() => onClickHandler(item, index)}
            open={openIndex === index}
            isHighlighted={highlightedIndex === index}
            onClose={() => setOpenIndex(-1)}
            disabled={item.disabled}
            onMouseOver={() => handleOnMouseOver(index)}
            isRootMenuTrigger
          >
            {item.label}
          </MenuItem>
        );
      })}
    </div>
  );
};

export default MenuBar;
