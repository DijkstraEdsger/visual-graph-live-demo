import React, { useEffect, useState } from "react";
import "./App.css";
import Graph from "components/Graph/Graph";
import { Edge, VerticeType } from "types/graph";
import { GraphContainer } from "contexts/graphContainerContext";
import withAsyncData from "components/HOCs/withAsyncData";
import MenuToolbar from "components/MenuToolbar/MenuToolbar";
import DraggableLineComponent from "components/DraggableLineComponent/DraggableLineComponent";

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
  const [positions, setPositions] = useState<{
    [key: string]: { left: number; top: number };
  }>({
    1: { left: 100, top: 100 },
    2: { left: 300, top: 100 },
    3: { left: 200, top: 300 },
  });

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

  const addVerticeHandle = () => {
    setVertices([...vertices, vertices.length + 1]);
  };

  const addEdgeHandler = (edge: Edge) => {
    setEdges([...edges, edge]);
  };

  const addVerticeHandler = (
    vertice: VerticeType,
    position: {
      x: number;
      y: number;
    }
  ) => {
    setVertices([...vertices, vertice]);
    setPositions({
      ...positions,
      [vertice]: { left: position.x, top: position.y },
    });
  };

  const downloadGraphAsTxt = () => {
    // the txt file will contain the vertices, edges and positions of the vertices
    // the format will be like a JSON object

    const data = {
      vertices,
      edges,
      positions,
    };

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "graph.txt";
    a.click();
  };

  return (
    <>
      <MenuToolbar />
      <button type="button" onClick={addVerticeHandle}>
        Add vertice
      </button>
      <button type="button" onClick={downloadGraphAsTxt}>
        Download graph as txt
      </button>

      <GraphContainer>
        <GraphWithAsyncData
          vertices={vertices}
          edges={edges}
          traversalPath={traversalPath}
          animatePath
          initialPositions={positions}
          speed={2}
          onAddEdge={addEdgeHandler}
          onAddVertice={addVerticeHandler}
        />
      </GraphContainer>
    </>
  );
}

export default App;
