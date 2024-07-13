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
  animatePath = false,
}: GraphProps) => {
  const verticesRefs = useRef(vertices.map(() => createRef<HTMLDivElement>()));
  const [verticesElements, setVerticesElements] = useState<JSX.Element[]>([]);
  const [edgesElements, setEdgesElements] = useState<JSX.Element[]>([]);
  const [wayPointsSecuential, setWayPointsSecuential] = useState<VerticeType[]>(
    []
  );

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (animatePath) {
      let counter = 1;
      interval = setInterval(() => {
        const newWayPoints = traversalPath.slice(0, counter);
        setWayPointsSecuential(newWayPoints);
        counter += 1;

        if (newWayPoints.length === traversalPath.length) {
          clearInterval(interval);
        }
      }, 1000);
    } else {
      setWayPointsSecuential(traversalPath);
    }

    return () => clearInterval(interval);
  }, [traversalPath, animatePath]);

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
                isVisited
                ref={verticesRefs.current[index]}
              />
            );
          }
        });

        return newVertices;
      });

      setEdgesElements((prev) => {
        const newEdges = [...prev];
        wayPointsSecuential.forEach((wayPoint, index) => {
          if (index < wayPointsSecuential.length - 1) {
            const vertice1 = wayPoint;
            const vertice2 = wayPointsSecuential[index + 1];
            const edgeIndex = edges.findIndex(
              ([v1, v2]) =>
                (v1 === vertice1 && v2 === vertice2) ||
                (v1 === vertice2 && v2 === vertice1)
            );

            if (edgeIndex !== -1) {
              newEdges[edgeIndex] = (
                <Line
                  key={`${vertice1}-${vertice2}`}
                  div1Ref={verticesRefs.current[vertices.indexOf(vertice1)]}
                  div2Ref={verticesRefs.current[vertices.indexOf(vertice2)]}
                  isTraversed
                />
              );
            }
          }
        });

        return newEdges;
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
