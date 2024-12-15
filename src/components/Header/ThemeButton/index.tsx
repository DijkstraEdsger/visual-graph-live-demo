import React from "react";
import Icon from "components/Icon";
import { useThemeContext } from "contexts/themeContext";
import classes from "./classes.module.scss";

const ThemeButton: React.FC = () => {
  const { theme, toggleTheme } = useThemeContext();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className={classes.theme_button}
      aria-label="Theme mode"
    >
      <Icon name={theme === "light" ? "sun" : "moon"} />
    </button>
  );
};

export default ThemeButton;
