import React, { useId } from "react";
import Button from "components/Button/Button";
import classes from "./classes.module.scss";
import Select from "components/Select";
import { useGraph } from "contexts/graphContext";
import { useAppState } from "contexts/app-context/root/provider";

interface DijkstraInputsProps {
  onRunDijkstra: (startNode: string, endNode: string) => void;
  onCleanPath?: () => void;
}

const DijkstraInputs: React.FC<DijkstraInputsProps> = ({
  onRunDijkstra,
  onCleanPath = () => {},
}) => {
  const [startNode, setStartNode] = React.useState("");
  const [endNode, setEndNode] = React.useState("");
  const id = useId();
  const {
    graph: { vertices },
    selectVerticeHandler,
  } = useGraph();
  const {
    algorithm: { isRunning, isShowingResult },
  } = useAppState();

  const handleEndNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndNode(e.target.value);
  };

  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(e.target.value);
    selectVerticeHandler?.(e.target.value);
  };

  return (
    <div className={classes.dijkstra}>
      <Select
        id={`${id}-start-node`}
        placeholder="Select starting node"
        onChange={handleStartNodeChange}
        value={startNode}
        label="Starting Node"
        name="startNode"
        options={vertices
          ?.filter((v) => v.id !== endNode)
          .map((vertice) => ({
            value: vertice.id,
            label: vertice.label,
          }))}
      />
      <Select
        id={`${id}-end-node`}
        placeholder="Select ending node"
        onChange={handleEndNodeChange}
        value={endNode}
        label="Ending Node"
        name="endNode"
        options={vertices
          ?.filter((v) => v.id !== startNode)
          .map((vertice) => ({
            value: vertice.id,
            label: vertice.label,
          }))}
      />

      <div className={classes.dijkstra__buttons}>
        <Button onClick={onCleanPath}>Reset</Button>
        <Button
          onClick={() => onRunDijkstra(startNode, endNode)}
          disabled={!startNode || !endNode || isRunning || isShowingResult}
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

export default DijkstraInputs;
