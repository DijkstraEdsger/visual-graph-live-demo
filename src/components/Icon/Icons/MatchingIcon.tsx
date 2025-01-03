import React from "react";

interface IconProps {
  size?: string;
  style?: React.CSSProperties;
  color?: string;
  props?: any;
}

const MatchingIcon: React.FC<IconProps> = ({
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
      {/* Background */}
      <rect width="24" height="24" fill="none" />

      {/* Left Set Nodes */}
      <circle cx="6" cy="6" r="2" fill={color} />
      <circle cx="6" cy="12" r="2" fill={color} />
      <circle cx="6" cy="18" r="2" fill={color} />

      {/* Right Set Nodes */}
      <circle cx="18" cy="6" r="2" fill={color} />
      <circle cx="18" cy="12" r="2" fill={color} />
      <circle cx="18" cy="18" r="2" fill={color} />

      {/* Edges */}
      <line x1="6" y1="6" x2="18" y2="6" stroke="#b0bec5" strokeWidth="1" />
      <line x1="6" y1="6" x2="18" y2="12" stroke="#b0bec5" strokeWidth="1" />
      <line x1="6" y1="12" x2="18" y2="6" stroke="#b0bec5" strokeWidth="1" />
      <line x1="6" y1="12" x2="18" y2="12" stroke="#b0bec5" strokeWidth="1" />
      <line x1="6" y1="18" x2="18" y2="12" stroke="#b0bec5" strokeWidth="1" />
      <line x1="6" y1="18" x2="18" y2="18" stroke="#b0bec5" strokeWidth="1" />

      {/* Matching Edges */}
      <line x1="6" y1="6" x2="18" y2="6" stroke="#ff0000" strokeWidth="2" />
      <line x1="6" y1="12" x2="18" y2="12" stroke="#ff0000" strokeWidth="2" />
      <line x1="6" y1="18" x2="18" y2="18" stroke="#ff0000" strokeWidth="2" />
    </svg>
  );
};

export default MatchingIcon;
