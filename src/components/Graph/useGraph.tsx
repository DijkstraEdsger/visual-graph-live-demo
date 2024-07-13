import Line from "components/Line/Line";
import Vertice from "components/Vertice/Vertice";
import { createRef, useEffect, useRef, useState } from "react";
import { Edge, VerticeType } from "types/graph";

type GraphProps = {
  vertices?: VerticeType[];
  edges?: Edge[];
  wayPoints?: VerticeType[];
};

const useGraph = ({
  vertices = [],
  edges = [],
  wayPoints = [],
}: GraphProps) => {
  const verticesRefs = useRef(vertices.map(() => createRef<HTMLDivElement>()));
  const [verticesElements, setVerticesElements] = useState<JSX.Element[]>([]);
  const [edgesElements, setEdgesElements] = useState<JSX.Element[]>([]);
  const [wayPointsSecuential, setWayPointsSecuential] = useState<VerticeType[]>(
    []
  );

  useEffect(() => {
    let counter = 1;
    const interval = setInterval(() => {
      const newWayPoints = wayPoints.slice(0, counter);
      setWayPointsSecuential(newWayPoints);
      counter += 1;

      if (newWayPoints.length === wayPoints.length) {
        clearInterval(interval);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [wayPoints]);

  useEffect(() => {
    updateVerticesRefs();
    updateVerticesElements();
  }, [vertices]);

  useEffect(() => {
    if (wayPointsSecuential.length > 0) {
      setVerticesElements((prev) => {
        const newVertices = [...prev];
        wayPointsSecuential.forEach((wayPoint) => {
          const index = vertices.indexOf(wayPoint);
          if (index !== -1) {
            newVertices[index] = (
              <Vertice
                key={wayPoint}
                label={wayPoint}
                color="green"
                ref={verticesRefs.current[index]}
              />
            );
          }
        });

        return newVertices;
      });
    }
  }, [wayPointsSecuential]);

  const updateVerticesRefs = () => {
    verticesRefs.current = vertices.map(
      (_, i) => verticesRefs.current[i] ?? createRef<HTMLDivElement>()
    );
  };

  const updateVerticesElements = () => {
    if (verticesElements.length === 0) {
      const verticesEl = vertices.map((vertice, index) => (
        <Vertice
          key={vertice}
          label={vertice}
          ref={verticesRefs.current[index]}
        />
      ));

      setVerticesElements(verticesEl);
    } else {
      setVerticesElements((prev) => {
        const newVertices = [...prev];
        vertices.forEach((vertice, index) => {
          if (!newVertices[index]) {
            newVertices[index] = (
              <Vertice
                key={vertice}
                label={vertice}
                ref={verticesRefs.current[index]}
              />
            );
          }
        });

        return newVertices;
      });
    }
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
