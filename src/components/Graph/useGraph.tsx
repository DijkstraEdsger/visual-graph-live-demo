import Line from "components/Line/Line";
import Vertex from "components/Vertex/Vertex";
import { useGraphContainer } from "contexts/graphContainerContext";
import { cloneElement, createRef, useEffect, useRef, useState } from "react";
import { IEdge, INode, NodeId } from "types/graph";
import { useGraph as useGraphGlobalContext } from "contexts/graphContext";

const VERTEX_SIZE = 50;

type GraphProps = {
  vertices?: INode[];
  edges?: IEdge[];
  traversalPath?: NodeId[];
  highlightedEdges?: IEdge[];
  highlightedVertices?: NodeId[];
  dfsTraversal?: IEdge[];
  onAddEdge?: (edge: IEdge) => void;
  onAddVertex?: (vertex: INode) => void;
};

const useGraph = ({
  vertices = [],
  edges = [],
  traversalPath = [],
  highlightedEdges = [],
  highlightedVertices = [],
  dfsTraversal = [],
  onAddEdge = () => {},
  onAddVertex = () => {},
}: GraphProps) => {
  const verticesRefs = useRef(vertices.map(() => createRef<HTMLDivElement>()));
  const [verticesElements, setVerticesElements] = useState<JSX.Element[]>([]);
  const [edgesElements, setEdgesElements] = useState<JSX.Element[]>([]);
  const [newEdge, setNewEdge] = useState<IEdge | null>(null);
  const { edgeConnection, doubleClickPosition } = useGraphContainer();
  const {
    isDirected,
    selectedVertex,
    updatePositions,
    removeEdge,
    removeVertex,
  } = useGraphGlobalContext();

  useEffect(() => {
    if (selectedVertex) {
      const verticesElementsCopy = [...verticesElements];
      const findIndexVertex = vertices.findIndex(
        (vertex) => vertex.id === selectedVertex
      );

      verticesElementsCopy.forEach((vertexEl, index) => {
        verticesElementsCopy[index] = cloneElement(vertexEl, {
          ...vertexEl.props,
          isVisited: index === findIndexVertex,
        });
      });

      setVerticesElements([...verticesElementsCopy]);
    }
  }, [selectedVertex]);

  useEffect(() => {
    if (dfsTraversal.length > 0) {
      showDfsResult();
    } else {
      updateVerticesElements();
      updateEdgesElements();
    }
  }, [dfsTraversal]);

  const showDfsResult = () => {
    const edgesElIndexes: number[] = dfsTraversal.reduce(
      (acc: number[], edge) => {
        const edgeIndex = edges.findIndex(
          (e) =>
            (e.source === edge.source && e.target === edge.target) ||
            (e.source === edge.target && e.target === edge.source)
        );

        if (edgeIndex !== -1) {
          acc.push(edgeIndex);
        }

        return acc;
      },
      []
    );

    const updatedEdgesElements = [...edgesElements];
    const verticesElementsCopy = [...verticesElements];

    edgesElIndexes.forEach((edgeIndex) => {
      const edgeEl = updatedEdgesElements[edgeIndex];

      updatedEdgesElements[edgeIndex] = cloneElement(edgeEl, {
        isTraversed: true,
      });
    });

    dfsTraversal.forEach((edge, index) => {
      const findIndexVertex = vertices.findIndex(
        (vertex) => vertex.id === edge.target
      );
      verticesElementsCopy[findIndexVertex] = cloneElement(
        verticesElementsCopy[findIndexVertex],
        {
          ...verticesElementsCopy[findIndexVertex].props,
          isVisited: true,
        }
      );
    });

    setEdgesElements(updatedEdgesElements);
    setVerticesElements(verticesElementsCopy);
  };

  useEffect(() => {
    if (vertices) {
      updateVerticesElements();
    }
  }, [edgeConnection]);

  useEffect(() => {
    if (vertices) {
      updateVerticesRefs();
      updateVerticesElements();
    }
  }, [vertices]);

  useEffect(() => {
    if (highlightedEdges.length > 1) {
      updateEdgesElementsWithHighlightedEdges();
    } else {
      updateEdgesElements();
    }
  }, [highlightedEdges]);

  useEffect(() => {
    updateVerticesElements();
  }, [highlightedVertices]);

  const updateEdgesElementsWithHighlightedEdges = () => {
    const edgesElIndexes: number[] = highlightedEdges.reduce(
      (acc: number[], edge) => {
        const edgeIndex = edges.findIndex(
          (e) =>
            (e.source === edge.source && e.target === edge.target) ||
            (e.source === edge.target && e.target === edge.source)
        );

        if (edgeIndex !== -1) {
          acc.push(edgeIndex);
        }

        return acc;
      },
      []
    );

    const updatedEdgesElements = [...edgesElements];

    edgesElIndexes.forEach((edgeIndex) => {
      const edgeEl = updatedEdgesElements[edgeIndex];

      updatedEdgesElements[edgeIndex] = cloneElement(edgeEl, {
        isTraversed: true,
      });
    });

    setEdgesElements(updatedEdgesElements);
  };

  const existsEdge = (edge: IEdge) => {
    return edges.some(
      (e) =>
        (e.source === edge.source && e.target === edge.target) ||
        (e.source === edge.target && e.target === edge.source)
    );
  };

  const isValidEdge = (edge: IEdge) => {
    return !existsEdge(edge);
  };

  useEffect(() => {
    if (newEdge?.source && newEdge?.target && isValidEdge(newEdge)) {
      onAddEdge(newEdge);
    }
  }, [newEdge]);

  const generateNewVertexLabel = () => {
    const maxVertex = Math.max(...vertices.map((v) => Number(v.id)), 0);
    return (maxVertex + 1).toString();
  };

  const isValidVertexPosition = (position: { x: number; y: number }) => {
    return position.x !== 0 && position.y !== 0;
  };

  useEffect(() => {
    if (doubleClickPosition && isValidVertexPosition(doubleClickPosition)) {
      const newVertexLabel = generateNewVertexLabel();
      const updatedPosition = {
        x: doubleClickPosition.x - VERTEX_SIZE / 2,
        y: doubleClickPosition.y - VERTEX_SIZE / 2,
      };

      const newVertex: INode = {
        id: newVertexLabel,
        label: String(newVertexLabel),
        position: { left: updatedPosition.x, top: updatedPosition.y },
      };

      onAddVertex(newVertex);
    }
  }, [doubleClickPosition]);

  const updateVerticesRefs = () => {
    verticesRefs.current = vertices.map(
      (_, i) => verticesRefs.current[i] ?? createRef<HTMLDivElement>()
    );
  };

  const isVertexVisited = (vertex: INode) => {
    return traversalPath.includes(vertex.id);
  };

  const setNewConnectionInitialVertex = (
    vertexRef: React.RefObject<HTMLDivElement>,
    data: string | number
  ) => {
    const edge: IEdge = {
      source: data,
      target: "",
      weight: 1,
    };

    setNewEdge(edge);
    edgeConnection?.handleMouseDown(vertexRef);
  };

  const setNewConnectionSecondVertex = (
    vertexRef: React.RefObject<HTMLDivElement>,
    data: string | number
  ) => {
    const edge: IEdge = {
      ...newEdge!,
      target: data,
    };

    setNewEdge(edge);
    edgeConnection?.handleMouseDown(vertexRef);
  };

  const updateVerticesElements = () => {
    const verticesEl = vertices.map((vertex, index) => {
      const isVisited = isVertexVisited(vertex);
      const isHighlighted = highlightedVertices.includes(+vertex.id);

      return (
        <Vertex
          key={vertex.id}
          label={vertex.id}
          isVisited={isVisited || isHighlighted}
          ref={verticesRefs.current[index]}
          initialPosition={vertex.position}
          onMouseDownEdgeHint={(ref) =>
            setNewConnectionInitialVertex(ref, vertex.id)
          }
          isAVertexTryingToConnect={edgeConnection?.isDragging}
          onMouseUpEdgeHint={(data) => {
            setNewConnectionSecondVertex(verticesRefs.current[index], data);
          }}
          onChangePosition={(position) => updatePositions?.(vertex, position)}
          onRemove={() => removeVertex?.(vertex)}
        />
      );
    });

    setVerticesElements(verticesEl);
  };

  useEffect(() => {
    if (edges) {
      updateEdgesElements();
    }
  }, [edges]);

  const isEdgeTraversed = (edge: IEdge) => {
    const { source, target } = edge;
    const sourceIndex = traversalPath.indexOf(source);
    const targetIndex = traversalPath.indexOf(target);

    return (
      sourceIndex !== -1 &&
      targetIndex !== -1 &&
      (sourceIndex + 1 === targetIndex ||
        targetIndex + 1 === sourceIndex ||
        (sourceIndex === traversalPath.length - 1 && targetIndex === 0))
    );
  };

  const updateEdgesElements = () => {
    const edgesEl = edges.map((edge) => {
      const vertex1 = edge.source;
      const vertex2 = edge.target;
      const vertex1Ref =
        verticesRefs.current[vertices.findIndex((v) => v.id === vertex1)];
      const vertex2Ref =
        verticesRefs.current[vertices.findIndex((v) => v.id === vertex2)];
      const isTraversed = isEdgeTraversed(edge);

      const div1Rect = vertex1Ref.current?.getBoundingClientRect();
      const div2Rect = vertex2Ref.current?.getBoundingClientRect();
      const div1X = div1Rect?.x;
      const div1Y = div1Rect?.y;
      const div2X = div2Rect?.x;
      const div2Y = div2Rect?.y;

      return (
        <Line
          key={`${vertex1}-${vertex2}`}
          div1Ref={vertex1Ref}
          div2Ref={vertex2Ref}
          isTraversed={isTraversed}
          onRemove={() => removeEdge?.(edge)}
          isDirected={isDirected}
          div1X={div1X}
          div1Y={div1Y}
          div2X={div2X}
          div2Y={div2Y}
        />
      );
    });

    setEdgesElements(edgesEl);
  };

  const updateEdgesElementsWithTraversalPath = () => {
    const edgesElIndexes: number[] = traversalPath.reduce(
      (acc: number[], vertex, index) => {
        const nextIndex = index + 1;
        const nextVertex = traversalPath[nextIndex];

        if (nextVertex) {
          const edgeIndex = edges.findIndex(
            (edge) =>
              (edge.source === vertex && edge.target === nextVertex) ||
              (edge.source === nextVertex && edge.target === vertex)
          );

          if (edgeIndex !== -1) {
            acc.push(edgeIndex);
          }
        }

        return acc;
      },
      []
    );

    const updatedEdgesElements = [...edgesElements];

    edgesElIndexes.forEach((edgeIndex) => {
      const edgeEl = updatedEdgesElements[edgeIndex];

      updatedEdgesElements[edgeIndex] = cloneElement(edgeEl, {
        isTraversed: true,
      });
    });

    setEdgesElements(updatedEdgesElements);
  };

  const updateEdgesAndVerticesElementsWithTraversalPath = () => {
    updateEdgesElementsWithTraversalPath();
    updateVerticesElements();
  };

  const updateEdgesAndVerticesElements = () => {
    updateEdgesElements();
    updateVerticesElements();
  };

  useEffect(() => {
    if (traversalPath.length > 1) {
      updateEdgesAndVerticesElementsWithTraversalPath();
    } else {
      updateEdgesAndVerticesElements();
    }
  }, [traversalPath, isDirected]);

  return {
    verticesElements,
    edgesElements,
    edgeConnection,
  };
};

export default useGraph;
