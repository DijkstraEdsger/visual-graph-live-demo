import React from "react";
import useHeaderVM from "./useHeaderVM";
import classes from "./classes.module.scss";
import MenuBar from "components/MenuBar";
import ThemeButton from "./ThemeButton";
import LogoIcon from "components/Icon/Icons/LogoIcon";

const Header: React.FC = () => {
  const { menus } = useHeaderVM();

  return (
    <header className={classes.header}>
      <div className={classes.logo}>
        <LogoIcon />
      </div>
      <MenuBar menus={menus} />
      <ThemeButton />
    </header>
  );
};

export default Header;
