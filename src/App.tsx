import React, { useEffect } from "react";
import "./App.css";
import Graph from "components/Graph/Graph";
import { Edge, VerticeType } from "types/graph";
import { GraphContainer } from "contexts/graphContainerContext";
import withAsyncData from "components/HOCs/withAsyncData";
import MenuToolbar from "components/MenuToolbar/MenuToolbar";

const GraphWithAsyncData = withAsyncData(Graph);

function App() {
  const [vertices, setVertices] = React.useState<VerticeType[]>([1, 2, 3]);
  const [edges, setEdges] = React.useState<Edge[]>([
    [1, 2],
    [2, 3],
    [3, 1],
  ]);
  const [traversalPath, setWayPoints] = React.useState<VerticeType[]>([
    1, 2, 3,
  ]);

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
    <>
      <MenuToolbar />
      <GraphContainer>
        <GraphWithAsyncData
          vertices={vertices}
          edges={edges}
          traversalPath={traversalPath}
          animatePath
          initialPositions={{
            1: { left: 100, top: 100 },
            2: { left: 300, top: 100 },
            3: { left: 200, top: 300 },
          }}
          speed={2}
        />
      </GraphContainer>
    </>
  );
}

export default App;
