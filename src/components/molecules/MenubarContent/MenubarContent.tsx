import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import "../../../scss/src/molecules/MenubarContent.scss";

interface MenubarContentProps {
  children: React.ReactNode;
  align?: string;
  sideOffset?: number;
  alignOffset?: number;
}

const MenubarContent: React.FC<MenubarContentProps> = ({ children }) => {
  return (
    <Menubar.Content className="MenubarContent">{children}</Menubar.Content>
  );
};

export default MenubarContent;
