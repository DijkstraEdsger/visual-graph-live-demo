import React from "react";
import useGraph from "./useGraph";
import { IEdge, InitialPositionsType, INode, NodeId } from "types/graph";

type GraphProps = {
  vertices?: INode[];
  edges?: IEdge[];
  traversalPath?: NodeId[];
  initialPositions?: InitialPositionsType;
  isDirected?: boolean;
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
  isDirected = false,
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
        {isDirected && (
          <defs>
            <marker
              id="arrowhead"
              markerWidth="10"
              markerHeight="7"
              refX="10"
              refY="3.5"
              orient="auto"
            >
              <polygon points="0 0, 10 3.5, 0 7" fill="black" />
            </marker>
          </defs>
        )}
        {edgesElements}
        <line
          x1={edgeConection?.lineStart.x}
          y1={edgeConection?.lineStart.y}
          x2={edgeConection?.lineEnd.x}
          y2={edgeConection?.lineEnd.y}
          stroke="black"
          markerEnd="url(#arrowhead)"
          strokeWidth="2"
        />
      </svg>
    </>
  );
};

export default Graph;
