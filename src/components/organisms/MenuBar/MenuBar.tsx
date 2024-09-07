import React, { useEffect } from "react";
import "../../../scss/src/organisms/MenuBar.scss";
import MenuItem from "components/molecules/SubMenu/SubMenu";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
};

interface MenubarProps {
  //   children: React.ReactNode;
  props?: React.HTMLProps<HTMLDivElement>;
  menus?: TItem[];
}

const MenuBar: React.FC<MenubarProps> = ({ menus, ...props }) => {
  const menuitemsRefs = React.useRef<HTMLDivElement[]>([]);
  const [focusedIndex, setFocusedIndex] = React.useState<number>(-1);
  const [isExpanded, setIsExpanded] = React.useState<boolean>(false);

  useEffect(() => {
    if (focusedIndex >= 0) {
      menuitemsRefs.current[focusedIndex].focus();
      console.log('main menuitem focus');
      
    }

    return () => {
      if (focusedIndex >= 0) {
        menuitemsRefs.current[focusedIndex].blur();
      }
    };
  }, [focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const { key } = e;

    switch (key) {
      case "ArrowRight":
        console.log("ArrowRight");
        
        if (focusedIndex < menuitemsRefs.current.length - 1) {
          setFocusedIndex(focusedIndex + 1);
        } else {
          setFocusedIndex(0);
        }

        break;
      case "ArrowLeft":
        if (focusedIndex > 0) {
          setFocusedIndex(focusedIndex - 1);
        } else {
          setFocusedIndex(menuitemsRefs.current.length - 1);
        }

        break;
      case "Enter":
        if (menuitemsRefs.current[focusedIndex]) {
          menuitemsRefs.current[focusedIndex].click();
        }
        break;

      default:
        break;
    }
  };

  const onClickHandler = (item: TItem, index = -1) => {
    setFocusedIndex(index);
    // setIsExpanded(!isExpanded);
    item.onClick?.();
  };

  return (
    <div
      role="menubar"
      {...props}
      className="menubar"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {menus?.map((item: TItem, index: number) => {
        return (
          <MenuItem
            key={index}
            menuItems={item.items}
            isMainMenu
            isHighlighted={focusedIndex === index}
            ref={(el: HTMLDivElement) => {
              if (el) {
                menuitemsRefs.current[index] = el;
              }
            }}
            onClick={() => onClickHandler(item, index)}
            // isMenubarExpanded={isExpanded}
          >
            {item.label}
          </MenuItem>
        );
      })}
    </div>
  );
};

export default MenuBar;
