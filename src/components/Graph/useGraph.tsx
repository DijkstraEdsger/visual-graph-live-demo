import Line from "components/Line/Line";
import Vertice from "components/Vertice/Vertice";
import { createRef, useEffect, useRef, useState } from "react";
import { Edge, VerticeType } from "types/graph";

type GraphProps = {
  vertices?: VerticeType[];
  edges?: Edge[];
};

const useGraph = ({ vertices = [], edges = [] }: GraphProps) => {
  const verticesRefs = useRef(vertices.map(() => createRef<HTMLDivElement>()));
  const [verticesElements, setVerticesElements] = useState<JSX.Element[]>([]);
  const [edgesElements, setEdgesElements] = useState<JSX.Element[]>([]);

  useEffect(() => {
    updateVerticesRefs();
    updateVerticesElements();
  }, [vertices]);

  const updateVerticesRefs = () => {
    verticesRefs.current = vertices.map(
      (_, i) => verticesRefs.current[i] ?? createRef<HTMLDivElement>()
    );
  };

  const updateVerticesElements = () => {
    const verticesEl = vertices.map((vertice, index) => (
      <Vertice
        key={vertice}
        label={vertice}
        ref={verticesRefs.current[index]}
      />
    ));

    setVerticesElements(verticesEl);
  };

  useEffect(() => {
    updateEdgesElements();
  }, [edges]);

  const updateEdgesElements = () => {
    const edgesEl = edges.map((edge) => {
      const [vertice1, vertice2] = edge;
      const vertice1Ref = verticesRefs.current[vertices.indexOf(vertice1)];
      const vertice2Ref = verticesRefs.current[vertices.indexOf(vertice2)];

      return (
        <Line
          key={`${vertice1}-${vertice2}`}
          div1Ref={vertice1Ref}
          div2Ref={vertice2Ref}
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
