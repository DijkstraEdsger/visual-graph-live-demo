import React from "react";
import TextField from "components/TextField/TextField";
import Button from "components/Button/Button";
import classes from "./classes.module.scss";

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

  const handleStartNodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setStartNode(e.target.value);
  };

  const handleEndNodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEndNode(e.target.value);
  };

  return (
    <div className={classes.dijkstra}>
      <TextField
        placeholder="Enter starting node"
        onChange={handleStartNodeChange}
        value={startNode}
        label="Starting Node"
        type="text"
        name="startNode"
        id="startNode"
      />
      <TextField
        placeholder="Enter ending node"
        onChange={handleEndNodeChange}
        value={endNode}
        label="Ending Node"
        type="text"
        name="endNode"
        id="endNode"
      />

      <div className={classes.dijkstra__buttons}>
        <Button onClick={onCleanPath}>Reset</Button>
        <Button
          onClick={() => onRunDijkstra(startNode, endNode)}
          disabled={!startNode || !endNode}
        >
          Run & Show
        </Button>
      </div>
    </div>
  );
};

export default DijkstraInputs;
