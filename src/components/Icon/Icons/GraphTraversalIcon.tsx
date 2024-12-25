import React from "react";

interface IconProps {
  size?: string;
  style?: React.CSSProperties;
  color?: string;
  props?: any;
}

const GraphTraversalIcon: React.FC<IconProps> = ({
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
      <circle cx="4" cy="4" r="1.5" fill={color} />
      <circle cx="12" cy="4" r="1.5" fill={color} />
      <circle cx="20" cy="4" r="1.5" fill={color} />
      <circle cx="4" cy="12" r="1.5" fill={color} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
      <circle cx="20" cy="12" r="1.5" fill={color} />
      <circle cx="4" cy="20" r="1.5" fill={color} />
      <circle cx="12" cy="20" r="1.5" fill={color} />
      <circle cx="20" cy="20" r="1.5" fill={color} />

      {/* Edges */}
      <line x1="4" y1="4" x2="12" y2="4" stroke="#b0bec5" stroke-width="1" />
      <line x1="12" y1="4" x2="20" y2="4" stroke="#b0bec5" stroke-width="1" />
      <line x1="4" y1="4" x2="4" y2="12" stroke="#b0bec5" stroke-width="1" />
      <line x1="12" y1="4" x2="12" y2="12" stroke="#b0bec5" stroke-width="1" />
      <line x1="20" y1="4" x2="20" y2="12" stroke="#b0bec5" stroke-width="1" />
      <line x1="4" y1="12" x2="12" y2="12" stroke="#b0bec5" stroke-width="1" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#b0bec5" stroke-width="1" />
      <line x1="4" y1="12" x2="4" y2="20" stroke="#b0bec5" stroke-width="1" />
      <line x1="12" y1="12" x2="12" y2="20" stroke="#b0bec5" stroke-width="1" />
      <line x1="20" y1="12" x2="20" y2="20" stroke="#b0bec5" stroke-width="1" />
      <line x1="4" y1="20" x2="12" y2="20" stroke="#b0bec5" stroke-width="1" />
      <line x1="12" y1="20" x2="20" y2="20" stroke="#b0bec5" stroke-width="1" />

      {/* Traversal path */}
      <line x1="4" y1="4" x2="12" y2="4" stroke="#ff0000" stroke-width="2" />
      <line x1="12" y1="4" x2="12" y2="12" stroke="#ff0000" stroke-width="2" />
      <line x1="12" y1="12" x2="20" y2="12" stroke="#ff0000" stroke-width="2" />
      <line x1="20" y1="12" x2="20" y2="20" stroke="#ff0000" stroke-width="2" />
    </svg>
  );
};

export default GraphTraversalIcon;
