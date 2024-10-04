import React from "react";
import TextField from "components/TextField/TextField";
import Button from "components/Button/Button";

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
    <div>
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

      <br />
      <Button onClick={() => onRunDijkstra(startNode, endNode)}>
        Run Dijkstra
      </Button>
      <Button onClick={onCleanPath}>Clean Path</Button>
    </div>
  );
};

export default DijkstraInputs;
