import React from "react";
import useHeaderVM from "./useHeaderVM";
import classes from "./classes.module.scss";
import MenuBar from "components/MenuBar";

const Header: React.FC = () => {
  const { menus } = useHeaderVM();

  return (
    <header className={classes.header}>
      <MenuBar menus={menus} />
    </header>
  );
};

export default Header;
