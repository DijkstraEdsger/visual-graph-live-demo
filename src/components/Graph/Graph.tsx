import React from "react";
import useGraph from "./useGraph";
import { Edge, VerticeType } from "types/graph";

type GraphProps = {
  vertices?: VerticeType[];
  edges?: Edge[];
  traversalPath?: VerticeType[];
  animatePath?: boolean;
};

const Graph: React.FC<GraphProps> = ({
  vertices = [],
  edges = [],
  traversalPath = [],
  animatePath = false,
}: GraphProps) => {
  const { verticesElements, edgesElements } = useGraph({
    vertices,
    edges,
    traversalPath,
    animatePath,
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
