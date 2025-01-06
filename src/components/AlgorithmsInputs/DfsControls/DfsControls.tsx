import React, { useId } from "react";
import Button from "components/Button/Button";
import classes from "./classes.module.scss";
import Select from "components/Select";
import { useGraph } from "contexts/graphContext";
import { useAppState } from "contexts/app-context/root/provider";
import LoaderSpinner from "components/LoaderSpinner";

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
    selectVertexHandler,
  } = useGraph();
  const {
    algorithm: { isRunning, isShowingResult },
  } = useAppState();

  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(e.target.value);
    selectVertexHandler?.(e.target.value);
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
          ...vertices?.map((vertex) => ({
            value: vertex.id,
            label: vertex.label,
          })),
        ]}
      />

      <div className={classes.controls__buttons}>
        <Button onClick={onReset}>Reset</Button>
        <Button
          onClick={() => onRun?.(startNode)}
          disabled={!startNode || isRunning || isShowingResult}
        >
          <span className={classes.controls__button_show_content}>
            {(isRunning || isShowingResult) && <LoaderSpinner size={14} />}
            {isRunning
              ? "Running..."
              : isShowingResult
              ? "Showing..."
              : "Show result"}
          </span>
        </Button>
      </div>
    </div>
  );
};

export default DfsControls;
