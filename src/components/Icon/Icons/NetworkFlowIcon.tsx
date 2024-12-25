import React from "react";

interface IconProps {
  size?: string;
  style?: React.CSSProperties;
  color?: string;
  props?: any;
}

const NetworkFlowIcon: React.FC<IconProps> = ({
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

      {/* Nodes */}
      <circle cx="4" cy="12" r="2" fill={color} />
      {/* Source Node */}
      <circle cx="12" cy="6" r="2" fill={color} />
      <circle cx="12" cy="18" r="2" fill={color} />
      <circle cx="20" cy="12" r="2" fill={color} />
      {/* Sink Node */}

      {/* Edges */}
      <line x1="4" y1="12" x2="12" y2="6" stroke="#b0bec5" strokeWidth="1" />
      <line x1="4" y1="12" x2="12" y2="18" stroke="#b0bec5" strokeWidth="1" />
      <line x1="12" y1="6" x2="20" y2="12" stroke="#b0bec5" strokeWidth="1" />
      <line x1="12" y1="18" x2="20" y2="12" stroke="#b0bec5" strokeWidth="1" />

      {/* Flow Path */}
      <line
        x1="4"
        y1="12"
        x2="20"
        y2="12"
        stroke="#ff0000"
        strokeWidth="2"
        markerEnd="url(#arrow-smallest)"
      />

      {/* Arrow Marker */}
      <defs>
        <marker
          id="arrow-smallest"
          markerWidth="3"
          markerHeight="3"
          refX="1.5"
          refY="1.5"
          orient="auto"
          markerUnits="strokeWidth"
        >
          <path d="M0,0 L0,3 L3,1.5 z" fill="#ff0000" />
        </marker>
      </defs>
    </svg>
  );
};

export default NetworkFlowIcon;
