import React from "react";
import useHeaderVM from "./useHeaderVM";
import classes from "./classes.module.scss";
import MenuBar from "components/MenuBar";
import ThemeButton from "./ThemeButton";

const Header: React.FC = () => {
  const { menus } = useHeaderVM();

  return (
    <header className={classes.header}>
      <MenuBar menus={menus} />
      <ThemeButton />
    </header>
  );
};

export default Header;
