import React from "react";
import classes from "./classes.module.scss";
import { useGraphContainer } from "contexts/graphContainerContext";
import { useAppState } from "contexts/app-context/root/provider";

const StatusBar: React.FC = () => {
  // const { mousePosition } = useGraphContainer();
  const {
    ui: { mousePosition },
  } = useAppState();

  return (
    <div className={classes.status_bar}>
      {mousePosition && (
        <div className={classes.status_bar__mouse_position}>
          x: {mousePosition?.x}, y: {mousePosition?.y}
        </div>
      )}
    </div>
  );
};

export default StatusBar;
