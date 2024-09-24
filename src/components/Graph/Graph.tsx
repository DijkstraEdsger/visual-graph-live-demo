import React from "react";
import useGraph from "./useGraph";
import { IEdge, InitialPositionsType, INode, NodeId } from "types/graph";

type GraphProps = {
  vertices?: INode[];
  edges?: IEdge[];
  traversalPath?: NodeId[];
  initialPositions?: InitialPositionsType;
  onAddEdge?: (edge: IEdge) => void;
  onAddVertice?: (
    vertice: INode,
    position: {
      x: number;
      y: number;
    }
  ) => void;
};

const Graph: React.FC<GraphProps> = ({
  vertices = [],
  edges = [],
  traversalPath = [],
  initialPositions,
  onAddEdge = () => {},
  onAddVertice = () => {},
}: GraphProps) => {
  const { verticesElements, edgesElements, edgeConection } = useGraph({
    vertices,
    edges,
    traversalPath,
    initialPositions,
    onAddEdge,
    onAddVertice,
  });

  return (
    <>
      {verticesElements}
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        {edgesElements}
        <line
          x1={edgeConection?.lineStart.x}
          y1={edgeConection?.lineStart.y}
          x2={edgeConection?.lineEnd.x}
          y2={edgeConection?.lineEnd.y}
          stroke="black"
        />
      </svg>
    </>
  );
};

export default Graph;
