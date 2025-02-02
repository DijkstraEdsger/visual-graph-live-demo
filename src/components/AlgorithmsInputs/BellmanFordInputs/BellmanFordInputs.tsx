import React, { useId } from "react";
import Button from "components/Button/Button";
import Select from "components/Select";
import { useGraph } from "contexts/graphContext";

interface BellmanFordInputsProps {
  onRun: (startNode: string, endNode: string) => void;
  onCleanPath?: () => void;
}

const BellmanFordInputs: React.FC<BellmanFordInputsProps> = ({
  onRun,
  onCleanPath = () => {},
}) => {
  const [startNode, setStartNode] = React.useState("");
  const [endNode, setEndNode] = React.useState("");
  const id = useId();
  const {
    graph: { vertices },
    selectVertexHandler,
  } = useGraph();

  const handleEndNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEndNode(e.target.value);
  };

  const handleStartNodeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setStartNode(e.target.value);
    selectVertexHandler?.(e.target.value);
  };

  return (
    <div>
      <Select
        id={`${id}-start-node`}
        placeholder="Select starting node"
        onChange={handleStartNodeChange}
        value={startNode}
        label="Starting Node"
        name="startNode"
        options={vertices
          ?.filter((v) => v.id !== endNode)
          .map((vertex) => ({
            value: vertex.id,
            label: vertex.label,
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
          .map((vertex) => ({
            value: vertex.id,
            label: vertex.label,
          }))}
      />

      <br />
      <Button onClick={onCleanPath}>Reset</Button>
      <Button
        onClick={() => onRun(startNode, endNode)}
        disabled={!startNode || !endNode}
      >
        Show result
      </Button>
    </div>
  );
};

export default BellmanFordInputs;
