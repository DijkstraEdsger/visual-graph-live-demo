import Line from "components/Line/Line";
import Vertice from "components/Vertice/Vertice";
import { useGraphContainer } from "contexts/graphContainerContext";
import { cloneElement, createRef, useEffect, useRef, useState } from "react";
import { Edge, InitialPositionsType, VerticeType } from "types/graph";
import { useGraph as useGraphGlobalContext } from "contexts/graphContext";

const VERTICE_SIZE = 50;

type GraphProps = {
  vertices?: VerticeType[];
  edges?: Edge[];
  traversalPath?: VerticeType[];
  initialPositions?: InitialPositionsType;
  onAddEdge?: (edge: Edge) => void;
  onAddVertice?: (
    vertice: VerticeType,
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
  initialPositions,
  onAddEdge = () => {},
  onAddVertice = () => {},
}: GraphProps) => {
  const verticesRefs = useRef(vertices.map(() => createRef<HTMLDivElement>()));
  const [verticesElements, setVerticesElements] = useState<JSX.Element[]>([]);
  const [edgesElements, setEdgesElements] = useState<JSX.Element[]>([]);
  const [newEdge, setNewEdge] = useState<Edge | null>(null);
  const { edgeConection, doubleClickPosition } = useGraphContainer();
  const { updatePositions, removeEdge, removeVertice } =
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

  const existsEdge = (edge: Edge) => {
    return edges.some(
      (e) =>
        (e[0] === edge[0] && e[1] === edge[1]) ||
        (e[0] === edge[1] && e[1] === edge[0])
    );
  };

  const isValidEdge = (edge: Edge) => {
    return !existsEdge(edge);
  };

  useEffect(() => {
    if (newEdge?.[0] && newEdge?.[1] && isValidEdge(newEdge)) {
      onAddEdge(newEdge);
    }
  }, [newEdge]);

  const generatenewVerticeLabel = () => {
    const maxVertice = Math.max(...vertices.map((v) => Number(v)), 0);
    return maxVertice + 1;
  };

  const isValidVerticePosition = (position: { x: number; y: number }) => {
    return position.x !== 0 && position.y !== 0;
  };

  useEffect(() => {
    if (doubleClickPosition && isValidVerticePosition(doubleClickPosition)) {
      const newVerticeLabel = generatenewVerticeLabel();
      const updatedPosition = {
        x: doubleClickPosition.x - VERTICE_SIZE / 2,
        y: doubleClickPosition.y - VERTICE_SIZE / 2,
      };

      onAddVertice(newVerticeLabel, updatedPosition);
    }
  }, [doubleClickPosition]);

  const updateVerticesRefs = () => {
    verticesRefs.current = vertices.map(
      (_, i) => verticesRefs.current[i] ?? createRef<HTMLDivElement>()
    );
  };

  const isVerticeVisited = (vertice: VerticeType) => {
    return traversalPath.includes(vertice);
  };

  const setNewConnectionInitialVertice = (
    verticeRef: React.RefObject<HTMLDivElement>,
    data: string | number
  ) => {
    setNewEdge([data, ""]);
    edgeConection?.handleMouseDown(verticeRef);
  };

  const setNewConnectionSecondVertice = (
    verticeRef: React.RefObject<HTMLDivElement>,
    data: string | number
  ) => {
    setNewEdge([newEdge![0], data]);
    edgeConection?.handleMouseDown(verticeRef);
  };

  const updateVerticesElements = () => {
    const verticesEl = vertices.map((vertice, index) => {
      const isVisited = isVerticeVisited(vertice);

      return (
        <Vertice
          key={vertice}
          label={vertice}
          isVisited={isVisited}
          ref={verticesRefs.current[index]}
          initialPosition={initialPositions?.[vertice]}
          onMouseDownEdgeHint={(ref) =>
            setNewConnectionInitialVertice(ref, vertice)
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

  const isEdgeTraversed = (edge: Edge) => {
    const [vertice1, vertice2] = edge;
    const vertice1Index = traversalPath.indexOf(vertice1);
    const vertice2Index = traversalPath.indexOf(vertice2);

    return (
      vertice1Index !== -1 &&
      vertice2Index !== -1 &&
      (vertice1Index + 1 === vertice2Index ||
        vertice2Index + 1 === vertice1Index ||
        (vertice1Index === traversalPath.length - 1 && vertice2Index === 0))
    );
  };

  const updateEdgesElements = () => {
    const edgesEl = edges.map((edge) => {
      const [vertice1, vertice2] = edge;
      const vertice1Ref = verticesRefs.current[vertices.indexOf(vertice1)];
      const vertice2Ref = verticesRefs.current[vertices.indexOf(vertice2)];
      const isTraversed = isEdgeTraversed(edge);

      return (
        <Line
          key={`${vertice1}-${vertice2}`}
          div1Ref={vertice1Ref}
          div2Ref={vertice2Ref}
          isTraversed={isTraversed}
          onRemove={() => removeEdge?.(edge)}
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
              (edge[0] === vertice && edge[1] === nextVertice) ||
              (edge[0] === nextVertice && edge[1] === vertice)
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

  useEffect(() => {
    if (traversalPath.length > 1) {
      updateEdgesElementsWithTraversalPath();
    }
  }, [traversalPath]);

  return {
    verticesElements,
    edgesElements,
    edgeConection,
  };
};

export default useGraph;
