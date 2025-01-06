import React from "react";
import useGraph from "./useGraph";
import { IEdge, INode, NodeId } from "types/graph";

type GraphProps = {
  vertices?: INode[];
  edges?: IEdge[];
  traversalPath?: NodeId[];
  highlightedEdges?: IEdge[];
  highlightedVertices?: NodeId[];
  isDirected?: boolean;
  dfsTraversal?: IEdge[];
  onAddEdge?: (edge: IEdge) => void;
  onAddVertex?: (vertex: INode) => void;
};

const Graph: React.FC<GraphProps> = ({
  vertices = [],
  edges = [],
  traversalPath = [],
  highlightedEdges = [],
  highlightedVertices = [],
  isDirected = false,
  dfsTraversal = [],
  onAddEdge = () => {},
  onAddVertex = () => {},
}: GraphProps) => {
  const { verticesElements, edgesElements, edgeConnection } = useGraph({
    vertices,
    edges,
    traversalPath,
    highlightedEdges,
    highlightedVertices,
    dfsTraversal,
    onAddEdge,
    onAddVertex,
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
              <polygon
                points="0 0, 10 3.5, 0 7"
                fill="var(--color-stroke-line-edge-default)"
              />
            </marker>
          </defs>
        )}
        {edgesElements}
        <line
          x1={edgeConnection?.lineStart.x}
          y1={edgeConnection?.lineStart.y}
          x2={edgeConnection?.lineEnd.x}
          y2={edgeConnection?.lineEnd.y}
          stroke="var(--color-stroke-line-edge-default)"
          markerEnd="url(#arrowhead)"
          strokeWidth="2"
        />
      </svg>
    </>
  );
};

export default Graph;
