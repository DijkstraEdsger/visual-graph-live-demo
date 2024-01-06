import React from "react";
import useGraph from "./useGraph";
import { Edge, VerticeType } from "types/graph";

type GraphProps = {
  vertices?: VerticeType[];
  edges?: Edge[];
};

const Graph: React.FC<GraphProps> = ({
  vertices = [],
  edges = [],
}: GraphProps) => {
  const { verticesElements, edgesElements } = useGraph({ vertices, edges });

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
