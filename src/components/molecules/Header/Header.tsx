import React from "react";
import MenuBar from "components/organisms/MenuBar";
import useHeaderVM from "./useHeaderVM";
import classes from "./classes.module.scss";

const Header: React.FC = () => {
  const { menus } = useHeaderVM();

  return (
    <header className={classes.header}>
      <MenuBar menus={menus} />
    </header>
  );
};

export default Header;
