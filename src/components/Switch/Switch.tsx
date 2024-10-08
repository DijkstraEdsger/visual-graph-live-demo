import React from "react";
import classes from "./classes.module.scss";

interface SwitchProps {
  children?: React.ReactNode;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

const Switch: React.FC<SwitchProps> = ({ children, checked, onChange }) => {
  return (
    <label className={classes.switch}>
      <input
        type="checkbox"
        title="Toggle switch"
        className={classes.switch__input}
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className={classes.switch__slider}></span>
      {children && <span className={classes.switch__label}>{children}</span>}
    </label>
  );
};

export default Switch;
