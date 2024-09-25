import React from "react";

interface DijkstraInputsProps {
  onRunDijkstra: (startNode: string, endNode: string) => void;
}

const DijkstraInputs: React.FC<DijkstraInputsProps> = ({ onRunDijkstra }) => {
  const [startNode, setStartNode] = React.useState("");
  const [endNode, setEndNode] = React.useState("");

  return (
    <div>
      <h1>Dijkstra Inputs</h1>
      <input
        type="text"
        placeholder="Enter starting node"
        onChange={(e) => setStartNode(e.target.value)}
        value={startNode}
      />
      <input
        type="text"
        placeholder="Enter ending node"
        onChange={(e) => setEndNode(e.target.value)}
        value={endNode}
      />
      <button type="button" onClick={() => onRunDijkstra(startNode, endNode)}>
        Run Dijkstra
      </button>
    </div>
  );
};

export default DijkstraInputs;
