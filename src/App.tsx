import React, { useEffect } from "react";
import "./App.css";
import Graph from "components/Graph/Graph";
import { Edge, VerticeType } from "types/graph";

function App() {
  const [vertices, setVertices] = React.useState<VerticeType[]>([1, 2, 3]);
  const [edges, setEdges] = React.useState<Edge[]>([
    [1, 2],
    [2, 3],
  ]);
  const [wayPoints, setWayPoints] = React.useState<VerticeType[]>([]);

  useEffect(() => {
    setTimeout(() => {
      setEdges([
        [1, 2],
        [2, 3],
        [3, 1],
      ]);
    }, 5000);

    setTimeout(() => {
      setVertices([1, 2, 3, 4]);
      setEdges([
        [1, 2],
        [2, 3],
        [3, 1],
        [4, 1],
        [4, 2],
        [4, 3],
      ]);
    }, 10000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setWayPoints([1, 2, 3]);
    }, 3000);
  }, []);

  return (
    <>
      <Graph vertices={vertices} edges={edges} wayPoints={wayPoints} />
    </>
  );
}

export default App;
