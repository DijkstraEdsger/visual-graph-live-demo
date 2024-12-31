import React from "react";
import LogoIcon from "components/Icon/Icons/LogoIcon";
import classes from "./classes.module.scss";

const LoaderSpinner: React.FC = () => {
  return (
    <div className={classes.loader}>
      <LogoIcon size="18px" />
    </div>
  );
};

export default LoaderSpinner;
