import React from "react";

interface IconProps {
  size?: string;
  style?: React.CSSProperties;
  color?: string;
  props?: any;
}

const MinimumSpanningTreeIcon: React.FC<IconProps> = ({
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
      {/* Nodes */}
      <circle cx="12" cy="4" r="1.5" fill={color} />
      <circle cx="6" cy="10" r="1.5" fill={color} />
      <circle cx="18" cy="10" r="1.5" fill={color} />
      <circle cx="4" cy="16" r="1.5" fill={color} />
      <circle cx="8" cy="16" r="1.5" fill={color} />
      <circle cx="16" cy="16" r="1.5" fill={color} />
      <circle cx="20" cy="16" r="1.5" fill={color} />

      {/* MST Edges */}
      <line x1="12" y1="4" x2="6" y2="10" stroke="#ff0000" stroke-width="1.5" />
      <line
        x1="12"
        y1="4"
        x2="18"
        y2="10"
        stroke="#ff0000"
        stroke-width="1.5"
      />
      <line x1="6" y1="10" x2="4" y2="16" stroke="#ff0000" stroke-width="1.5" />
      <line x1="6" y1="10" x2="8" y2="16" stroke="#ff0000" stroke-width="1.5" />
      <line
        x1="18"
        y1="10"
        x2="16"
        y2="16"
        stroke="#ff0000"
        stroke-width="1.5"
      />
      <line
        x1="18"
        y1="10"
        x2="20"
        y2="16"
        stroke="#ff0000"
        stroke-width="1.5"
      />
    </svg>
  );
};

export default MinimumSpanningTreeIcon;
