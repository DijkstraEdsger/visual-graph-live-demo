import Line from "components/Line/Line";
import Vertice from "components/Vertice/Vertice";
import { createRef, useEffect, useRef, useState } from "react";
import { Edge, VerticeType } from "types/graph";

type GraphProps = {
  vertices?: VerticeType[];
  edges?: Edge[];
  traversalPath?: VerticeType[];
  animatePath?: boolean;
};

const useGraph = ({
  vertices = [],
  edges = [],
  traversalPath = [],
}: GraphProps) => {
  const verticesRefs = useRef(vertices.map(() => createRef<HTMLDivElement>()));
  const [verticesElements, setVerticesElements] = useState<JSX.Element[]>([]);
  const [edgesElements, setEdgesElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    if (vertices.length) {
      updateVerticesRefs();
      updateVerticesElements();
    }
  }, [vertices, traversalPath]);

  const updateVerticesRefs = () => {
    verticesRefs.current = vertices.map(
      (_, i) => verticesRefs.current[i] ?? createRef<HTMLDivElement>()
    );
  };

  const isVerticeVisited = (vertice: VerticeType) => {
    return traversalPath.includes(vertice);
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
        />
      );
    });

    setVerticesElements(verticesEl);
  };

  useEffect(() => {
    if (edges.length) {
      updateEdgesElements();
    }
  }, [edges, traversalPath]);

  const isEdgeTraversed = (edge: Edge) => {
    const [vertice1, vertice2] = edge;
    const vertice1Index = traversalPath.indexOf(vertice1);
    const vertice2Index = traversalPath.indexOf(vertice2);

    return (
      vertice1Index !== -1 &&
      vertice2Index !== -1 &&
      vertice1Index + 1 === vertice2Index
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
        />
      );
    });

    setEdgesElements(edgesEl);
  };

  return {
    verticesElements,
    edgesElements,
  };
};

export default useGraph;
