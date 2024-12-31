import React from "react";
import LogoIcon from "components/Icon/Icons/LogoIcon";
import classes from "./classes.module.scss";

interface LoaderSpinnerProps {
  size?: number;
}

const LoaderSpinner: React.FC<LoaderSpinnerProps> = ({ size = 18 }) => {
  return (
    <span
      className={classes.loader}
      style={{
        width: `${size}px`,
        height: `${size}px`,
      }}
    >
      <LogoIcon size={`${size}px`} />
    </span>
  );
};

export default LoaderSpinner;
