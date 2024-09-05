import React, { useEffect } from "react";
import SubMenu from "components/molecules/SubMenu";
import "../../../scss/src/organisms/MenuBar.scss";
import MenuTrigger from "components/atoms/MenuTrigger";

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

  useEffect(() => {
    if (focusedIndex >= 0) {
      menuitemsRefs.current[focusedIndex].focus();
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

  return (
    <div
      role="menubar"
      {...props}
      className="menubar"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {menus?.map((item: TItem, index: number) => {
        if (item.items?.length) {
          return (
            <SubMenu
              key={index}
              triggerLabel={item.label}
              menuItems={item.items}
              isMainMenu
              isHighlighted={focusedIndex === index}
              ref={(el: HTMLDivElement) => {
                if (el) {
                  menuitemsRefs.current[index] = el;
                }
              }}
            />
          );
        }

        return (
          <MenuTrigger
            key={index}
            onClick={item.onClick}
            isHighlighted={focusedIndex === index}
            ref={(el) => {
              if (el) {
                menuitemsRefs.current[index] = el;
              }
            }}
            // className={focusedIndex === index ? "focused" : ""}
          >
            {item.label}
          </MenuTrigger>
        );
      })}
    </div>
  );
};

export default MenuBar;
