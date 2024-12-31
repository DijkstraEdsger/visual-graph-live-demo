import React, { useId } from "react";
import Button from "components/Button/Button";
import classes from "./classes.module.scss";
import Select from "components/Select";
import { useGraph } from "contexts/graphContext";
import { useAppState } from "contexts/app-context/root/provider";

interface DfsControlsProps {
  onRun?: (startNode: string) => void;
  onReset?: () => void;
}

const DfsControls: React.FC<DfsControlsProps> = ({
  onRun,
  onReset = () => {},
}) => {
  const [startNode, setStartNode] = React.useState("");
  const inputId = useId();
  const {
    graph: { vertices },
    selectVerticeHandler,
  } = useGraph();
  const {
    algorithm: { isRunning, isShowingResult },
  } = useAppState();

  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(e.target.value);
    selectVerticeHandler?.(e.target.value);
  };

  return (
    <div className={classes.controls}>
      <Select
        id={inputId}
        placeholder="Select starting node"
        onChange={handleStartNodeChange}
        value={startNode}
        label="Starting Node"
        name="startNode"
        options={[
          {
            value: "",
            label: "None",
          },
          ...vertices?.map((vertice) => ({
            value: vertice.id,
            label: vertice.label,
          })),
        ]}
      />

      <div className={classes.controls__buttons}>
        <Button onClick={onReset}>Reset</Button>
        <Button
          onClick={() => onRun?.(startNode)}
          disabled={!startNode || isRunning || isShowingResult}
        >
          {isRunning
            ? "Running..."
            : isShowingResult
            ? "Showing..."
            : "Show result"}
        </Button>
      </div>
    </div>
  );
};

export default DfsControls;
