import React, { useId } from "react";
import Button from "components/Button/Button";
import classes from "./classes.module.scss";
import Select from "components/Select";
import { useGraph } from "contexts/graphContext";
import { useAppState } from "contexts/app-context/root/provider";
import LoaderSpinner from "components/LoaderSpinner";

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
    selectVertexHandler,
  } = useGraph();
  const {
    algorithm: { isRunning, isShowingResult },
  } = useAppState();

  const handleEndNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndNode(e.target.value);
  };

  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(e.target.value);
    selectVertexHandler?.(e.target.value);
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
        options={[
          {
            value: "",
            label: "None",
          },
          ...vertices
            ?.filter((v) => v.id !== endNode)
            .map((vertex) => ({
              value: vertex.id,
              label: vertex.label,
            })),
        ]}
      />
      <Select
        id={`${id}-end-node`}
        placeholder="Select ending node"
        onChange={handleEndNodeChange}
        value={endNode}
        label="Ending Node"
        name="endNode"
        options={[
          {
            value: "",
            label: "None",
          },
          ...vertices
            ?.filter((v) => v.id !== startNode)
            .map((vertex) => ({
              value: vertex.id,
              label: vertex.label,
            })),
        ]}
      />

      <div className={classes.dijkstra__buttons}>
        <Button onClick={onCleanPath}>Reset</Button>
        <Button
          onClick={() => onRunDijkstra(startNode, endNode)}
          disabled={!startNode || !endNode || isRunning || isShowingResult}
        >
          <span className={classes.dijkstra__button_show_content}>
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

export default DijkstraInputs;
