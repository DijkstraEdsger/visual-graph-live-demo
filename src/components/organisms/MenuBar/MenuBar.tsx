import React, { useEffect } from "react";
import "../../../scss/src/organisms/MenuBar.scss";
import MenuItem from "components/molecules/SubMenu/SubMenu";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
};

interface MenubarProps {
  props?: React.HTMLProps<HTMLDivElement>;
  menus?: TItem[];
}

const MenuBar: React.FC<MenubarProps> = ({ menus = [], ...props }) => {
  const menubarRef = React.useRef<HTMLDivElement>(null);
  const [openIndex, setOpenIndex] = React.useState<number>(-1);
  const [higlightedIndex, setHiglightedIndex] = React.useState<number>(-1);

  // click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (openIndex >= 0) {
        if (
          menubarRef.current &&
          !menubarRef.current.contains(e.target as Node)
        ) {
          setOpenIndex(-1);
          setHiglightedIndex(-1);
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
      higlightedIndex >= 0 &&
      higlightedIndex !== openIndex
    ) {
      onClickHandler(menus[higlightedIndex], higlightedIndex);
    }
  }, [higlightedIndex, openIndex, menus]);

  const onClickHandler = (item: TItem, index = -1) => {
    setOpenIndex(index);
    setHiglightedIndex(index);
    item?.onClick?.();
  };

  const onKeyDownHandler = (e: React.KeyboardEvent) => {
    const key = e.key;

    switch (key) {
      case "ArrowRight":
        if (higlightedIndex < menus?.length - 1) {
          setHiglightedIndex(higlightedIndex + 1);
        } else {
          setHiglightedIndex(0);
        }

        break;
      case "ArrowLeft":
        if (higlightedIndex > 0) {
          setHiglightedIndex(higlightedIndex - 1);
        } else {
          setHiglightedIndex(menus?.length - 1);
        }

        break;
      case "Enter":
        onClickHandler(menus[higlightedIndex], higlightedIndex);
        break;

      default:
        break;
    }
  };

  return (
    <div
      role="menubar"
      {...props}
      className="menubar"
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
            isHighlighted={higlightedIndex === index}
            onClose={() => setOpenIndex(-1)}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </div>
  );
};

export default MenuBar;
