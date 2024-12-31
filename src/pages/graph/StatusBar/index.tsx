import React from "react";
import classes from "./classes.module.scss";
import { useAppState } from "contexts/app-context/root/provider";
import LoaderSpinner from "components/LoaderSpinner";

const StatusBar: React.FC = () => {
  const {
    ui: { mousePosition },
    algorithm: { selected, isRunning, isShowingResult },
  } = useAppState();

  return (
    <div className={classes.status_bar}>
      <div className={classes.status_bar__mouse_position}>
        {mousePosition && (
          <span>
            x: {mousePosition?.x}, y: {mousePosition?.y}
          </span>
        )}
      </div>
      <div className={classes.status_bar__notification}>
        {(isRunning || isShowingResult) && <LoaderSpinner />}
        {isRunning && <span>Running</span>}
        {isShowingResult && <span>Showing result</span>}
      </div>
    </div>
  );
};

export default StatusBar;
