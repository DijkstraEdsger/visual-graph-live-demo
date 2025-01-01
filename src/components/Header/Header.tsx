import React from "react";
import useHeaderVM from "./useHeaderVM";
import classes from "./classes.module.scss";
import MenuBar from "components/MenuBar";
import ThemeButton from "./ThemeButton";
import LogoIcon from "components/Icon/Icons/LogoIcon";
import { Link } from "react-router-dom";

const Header: React.FC = () => {
  const { menus } = useHeaderVM();

  return (
    <header className={classes.header}>
      <Link to="/" title="Graph Builder" className={classes.logo}>
        <LogoIcon />
      </Link>
      <MenuBar menus={menus} />
      <ThemeButton />
    </header>
  );
};

export default Header;
