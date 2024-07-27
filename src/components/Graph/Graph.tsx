import React from "react";
import useGraph from "./useGraph";
import { Edge, InitialPositionsType, VerticeType } from "types/graph";

type GraphProps = {
  vertices?: VerticeType[];
  edges?: Edge[];
  traversalPath?: VerticeType[];
  initialPositions?: InitialPositionsType;
};

const Graph: React.FC<GraphProps> = ({
  vertices = [],
  edges = [],
  traversalPath = [],
  initialPositions,
}: GraphProps) => {
  const { verticesElements, edgesElements, edgeConection } = useGraph({
    vertices,
    edges,
    traversalPath,
    initialPositions,
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
