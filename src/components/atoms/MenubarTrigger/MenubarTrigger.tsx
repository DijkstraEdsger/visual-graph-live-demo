import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import "../../../scss/src/atoms/MenubarTrigger.scss";

interface MenubarTriggerProps {
  children: React.ReactNode;
}

const MenubarTrigger: React.FC<MenubarTriggerProps> = ({ children }) => {
  return (
    <Menubar.Trigger className="MenubarTrigger">{children}</Menubar.Trigger>
  );
};

export default MenubarTrigger;
