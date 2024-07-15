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
  const { verticesElements, edgesElements } = useGraph({
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
      </svg>
    </>
  );
};

export default Graph;
