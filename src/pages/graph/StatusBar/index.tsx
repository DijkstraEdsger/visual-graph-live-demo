import React, { useState } from "react";
import classes from "./classes.module.scss";

const StatusBar: React.FC = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    setMousePosition({ x: event.clientX, y: event.clientY });
  };

  return (
    <div className={classes.status_bar}>
      <div className={classes.status_bar__mouse_position}>
        Mouse Position: {mousePosition.x}, {mousePosition.y}
      </div>
    </div>
  );
};

export default StatusBar;
