import Line from "components/Line/Line";
import Vertice from "components/Vertice/Vertice";
import { useGraphContainer } from "contexts/graphContainerContext";
import { cloneElement, createRef, useEffect, useRef, useState } from "react";
import { IEdge, InitialPositionsType, INode, NodeId } from "types/graph";
import { useGraph as useGraphGlobalContext } from "contexts/graphContext";

const VERTICE_SIZE = 50;

type GraphProps = {
  vertices?: INode[];
  edges?: IEdge[];
  traversalPath?: NodeId[];
  highlightedEdges?: IEdge[];
  highlightedVertices?: NodeId[];
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

const useGraph = ({
  vertices = [],
  edges = [],
  traversalPath = [],
  highlightedEdges = [],
  highlightedVertices = [],
  initialPositions,
  onAddEdge = () => {},
  onAddVertice = () => {},
}: GraphProps) => {
  const verticesRefs = useRef(vertices.map(() => createRef<HTMLDivElement>()));
  const [verticesElements, setVerticesElements] = useState<JSX.Element[]>([]);
  const [edgesElements, setEdgesElements] = useState<JSX.Element[]>([]);
  const [newEdge, setNewEdge] = useState<IEdge | null>(null);
  const { edgeConection, doubleClickPosition } = useGraphContainer();
  const { isDirected, updatePositions, removeEdge, removeVertice } =
    useGraphGlobalContext();

  useEffect(() => {
    if (vertices) {
      updateVerticesElements();
    }
  }, [edgeConection, initialPositions]);

  useEffect(() => {
    if (vertices) {
      updateVerticesRefs();
      updateVerticesElements();
    }
  }, [vertices]);

  useEffect(() => {
    if (highlightedEdges.length > 1) {
      updateEdgesElementsWithHiglightedEdges();
    } else {
      updateEdgesElements();
    }
  }, [highlightedEdges]);

  useEffect(() => {
    if (highlightedVertices.length) {
      updateVerticesElements();
    }
  }, [highlightedVertices]);

  const updateEdgesElementsWithHiglightedEdges = () => {
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

  const generateNewVerticeLabel = () => {
    const maxVertice = Math.max(...vertices.map((v) => Number(v.id)), 0);
    return (maxVertice + 1).toString();
  };

  const isValidVerticePosition = (position: { x: number; y: number }) => {
    return position.x !== 0 && position.y !== 0;
  };

  useEffect(() => {
    if (doubleClickPosition && isValidVerticePosition(doubleClickPosition)) {
      const newVerticeLabel = generateNewVerticeLabel();
      const updatedPosition = {
        x: doubleClickPosition.x - VERTICE_SIZE / 2,
        y: doubleClickPosition.y - VERTICE_SIZE / 2,
      };

      const newVertice: INode = {
        id: newVerticeLabel,
        label: String(newVerticeLabel),
      };

      onAddVertice(newVertice, updatedPosition);
    }
  }, [doubleClickPosition]);

  const updateVerticesRefs = () => {
    verticesRefs.current = vertices.map(
      (_, i) => verticesRefs.current[i] ?? createRef<HTMLDivElement>()
    );
  };

  const isVerticeVisited = (vertice: INode) => {
    return traversalPath.includes(vertice.id);
  };

  const setNewConnectionInitialVertice = (
    verticeRef: React.RefObject<HTMLDivElement>,
    data: string | number
  ) => {
    const edge: IEdge = {
      source: data,
      target: "",
      weight: 1,
    };

    setNewEdge(edge);
    edgeConection?.handleMouseDown(verticeRef);
  };

  const setNewConnectionSecondVertice = (
    verticeRef: React.RefObject<HTMLDivElement>,
    data: string | number
  ) => {
    const edge: IEdge = {
      ...newEdge!,
      target: data,
    };

    setNewEdge(edge);
    edgeConection?.handleMouseDown(verticeRef);
  };

  const updateVerticesElements = () => {
    const verticesEl = vertices.map((vertice, index) => {
      const isVisited = isVerticeVisited(vertice);
      const isHighlighted = highlightedVertices.includes(+vertice.id);

      return (
        <Vertice
          key={vertice.id}
          label={vertice.id}
          isVisited={isVisited || isHighlighted}
          ref={verticesRefs.current[index]}
          initialPosition={initialPositions?.[vertice.id]}
          onMouseDownEdgeHint={(ref) =>
            setNewConnectionInitialVertice(ref, vertice.id)
          }
          isAVerticeTryingToConnect={edgeConection?.isDragging}
          onMouseUpEdgeHint={(data) => {
            setNewConnectionSecondVertice(verticesRefs.current[index], data);
          }}
          onChangePosition={(position) => updatePositions(vertice, position)}
          onRemove={() => removeVertice?.(vertice)}
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
      const vertice1 = edge.source;
      const vertice2 = edge.target;
      const vertice1Ref =
        verticesRefs.current[vertices.findIndex((v) => v.id === vertice1)];
      const vertice2Ref =
        verticesRefs.current[vertices.findIndex((v) => v.id === vertice2)];
      const isTraversed = isEdgeTraversed(edge);

      return (
        <Line
          key={`${vertice1}-${vertice2}`}
          div1Ref={vertice1Ref}
          div2Ref={vertice2Ref}
          isTraversed={isTraversed}
          onRemove={() => removeEdge?.(edge)}
          isDirected={isDirected}
        />
      );
    });

    setEdgesElements(edgesEl);
  };

  const updateEdgesElementsWithTraversalPath = () => {
    const edgesElIndexes: number[] = traversalPath.reduce(
      (acc: number[], vertice, index) => {
        const nextIndex = index + 1;
        const nextVertice = traversalPath[nextIndex];

        if (nextVertice) {
          const edgeIndex = edges.findIndex(
            (edge) =>
              (edge.source === vertice && edge.target === nextVertice) ||
              (edge.source === nextVertice && edge.target === vertice)
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
    edgeConection,
  };
};

export default useGraph;
