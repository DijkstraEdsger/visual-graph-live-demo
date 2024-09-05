import * as Menubar from "@radix-ui/react-menubar";
import "../../../scss/src/atoms/MenubarItem.scss";

interface MenuitemProps {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
}

const MenubarItem: React.FC<MenuitemProps> = ({
  children,
  onClick,
  ...props
}) => {
  return (
    <Menubar.Item className="MenubarItem" onClick={onClick}>
      {children}
    </Menubar.Item>
  );
};

export default MenubarItem;
