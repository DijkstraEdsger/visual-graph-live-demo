import React from "react";

interface IconProps {
  size?: string;
  style?: React.CSSProperties;
  color?: string;
  props?: any;
}

const LogoIcon: React.FC<IconProps> = ({
  size = "sm",
  style,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      fill="none"
      stroke="#456efb"
      style={{
        width: size,
        height: size,
        ...style,
      }}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="6" cy="6" r="2" fill="#456efb" />
      <circle cx="18" cy="6" r="2" fill="#456efb" />
      <circle cx="6" cy="18" r="2" fill="#456efb" />
      <circle cx="18" cy="18" r="2" fill="#456efb" />

      <line x1="6" y1="6" x2="18" y2="6" />
      <line x1="6" y1="6" x2="6" y2="18" />
      <line x1="6" y1="18" x2="18" y2="18" />
      <line x1="18" y1="6" x2="18" y2="18" />
    </svg>
  );
};

export default LogoIcon;
