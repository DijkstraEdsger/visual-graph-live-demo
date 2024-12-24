import React from "react";

interface IconProps {
  size?: string;
  style?: React.CSSProperties;
  color?: string;
  props?: any;
}

const ShortestPathIcon: React.FC<IconProps> = ({
  size = "sm",
  style,
  color = "currentColor",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill={color}
      style={{
        width: size,
        height: size,
        ...style,
      }}
    >
      <circle cx="4" cy="4" r="2" fill={color} />
      <circle cx="20" cy="4" r="2" fill={color} />
      <circle cx="4" cy="20" r="2" fill={color} />
      <circle cx="20" cy="20" r="2" fill={color} />
      <line x1="4" y1="4" x2="20" y2="4" stroke={color} stroke-width="1" />
      <line x1="4" y1="4" x2="4" y2="20" stroke={color} stroke-width="1" />
      <line x1="20" y1="4" x2="20" y2="20" stroke={color} stroke-width="1" />
      <line x1="4" y1="20" x2="20" y2="20" stroke={color} stroke-width="1" />
      <line x1="4" y1="4" x2="20" y2="20" stroke="#ff0000" stroke-width="2" />
    </svg>
  );
};

export default ShortestPathIcon;
