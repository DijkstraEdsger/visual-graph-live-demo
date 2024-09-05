import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import "../../../scss/src/atoms/MenubarSeparator.scss";

const MenubarSeparator: React.FC = () => {
  return <Menubar.Separator className="MenubarSeparator" />;
};

export default MenubarSeparator;
