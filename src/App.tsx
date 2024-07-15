import React, { useEffect } from "react";
import "./App.css";
import Graph from "components/Graph/Graph";
import { Edge, VerticeType } from "types/graph";
import { GraphContainer } from "contexts/graphContainerContext";
import withAsyncData from "components/HOCs/withAsyncData";

const GraphWithAsyncData = withAsyncData(Graph);

function App() {
  const [vertices, setVertices] = React.useState<VerticeType[]>([1, 2, 3]);
  const [edges, setEdges] = React.useState<Edge[]>([
    [1, 2],
    [2, 3],
    [3, 1],
  ]);
  const [traversalPath, setWayPoints] = React.useState<VerticeType[]>([1, 2]);

  useEffect(() => {
    // setTimeout(() => {
    //   setEdges([
    //     [1, 2],
    //     [2, 3],
    //     [3, 1],
    //   ]);
    // }, 5000);
    // setTimeout(() => {
    //   setVertices([1, 2, 3, 4]);
    //   setEdges([
    //     [1, 2],
    //     [2, 3],
    //     [3, 1],
    //     [4, 1],
    //     [4, 2],
    //     [4, 3],
    //   ]);
    // }, 10000);
  }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setWayPoints([1, 2,]);
  //   }, 6000);
  // }, []);

  return (
    <GraphContainer>
      <GraphWithAsyncData
        vertices={vertices}
        edges={edges}
        traversalPath={traversalPath}
        animatePath
      />
    </GraphContainer>
  );
}

export default App;
