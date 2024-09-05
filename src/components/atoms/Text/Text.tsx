import React from "react";
import FontSize from "foundation/FontSize";
import "scss/src/atoms/Text.scss";

interface TextProps {
  children: React.ReactNode;
  size?: keyof typeof FontSize;
}

const Text: React.FC<TextProps> = ({ children, size = FontSize.base }) => {
  const className = `dse-text dse-text--${size}`;

  return <p className={className}>{children}</p>;
};

export default Text;
