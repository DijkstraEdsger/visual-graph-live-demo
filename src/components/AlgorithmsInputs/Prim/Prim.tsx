import React from "react";
import Button from "components/Button/Button";
import classes from "./classes.module.scss";
import { useAppState } from "contexts/app-context/root/provider";

interface PrimProps {
  onRun: () => void;
  onClean?: () => void;
}

const Prim: React.FC<PrimProps> = ({ onRun, onClean = () => {} }) => {
  const {
    algorithm: { isRunning, isShowingResult },
  } = useAppState();

  return (
    <div className={classes.prim}>
      <Button onClick={onClean}>Reset</Button>
      <Button onClick={onRun} disabled={isRunning || isShowingResult}>
        {isRunning
          ? "Running..."
          : isShowingResult
          ? "Showing..."
          : "Show result"}
      </Button>
    </div>
  );
};

export default Prim;
