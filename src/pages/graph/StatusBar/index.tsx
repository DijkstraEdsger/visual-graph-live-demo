import React from "react";
import classes from "./classes.module.scss";
import { useGraphContainer } from "contexts/graphContainerContext";

const StatusBar: React.FC = () => {
  const { mousePosition } = useGraphContainer();

  return (
    <div className={classes.status_bar}>
      <div className={classes.status_bar__mouse_position}>
        x: {mousePosition?.x}, y: {mousePosition?.y}
      </div>
    </div>
  );
};

export default StatusBar;
