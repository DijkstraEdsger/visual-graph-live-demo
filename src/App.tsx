import React, { useEffect, useState } from "react";
import "./App.css";
import Graph from "components/Graph/Graph";
import { Edge, VerticeType } from "types/graph";
import { GraphContainer } from "contexts/graphContainerContext";
import withAsyncData from "components/HOCs/withAsyncData";
import MenuToolbar from "components/MenuToolbar/MenuToolbar";
import DraggableLineComponent from "components/DraggableLineComponent/DraggableLineComponent";

const GraphWithAsyncData = withAsyncData(Graph);

const initialVertices = [1, 2, 3];
const initialEdges: Edge[] = [
  [1, 2],
  [2, 3],
  [3, 1],
];
const initialTraversalPath: VerticeType[] = [1, 2, 3, 4];
const initialPositions = {
  1: { left: 100, top: 100 },
  2: { left: 300, top: 100 },
  3: { left: 200, top: 300 },
};

function App() {
  const [vertices, setVertices] = React.useState<VerticeType[]>([]);
  const [edges, setEdges] = React.useState<Edge[]>([]);
  const [traversalPath, setWayPoints] = React.useState<VerticeType[]>([]);
  const [positions, setPositions] = useState<{
    [key: string]: { left: number; top: number };
  }>();
  const inputFileRef = React.useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setVertices([1, 2, 3, 4]);
  //     setEdges([
  //       [1, 2],
  //       [2, 3],
  //       [3, 1],
  //       [4, 1],
  //       [4, 2],
  //       [4, 3],
  //     ]);
  //     setPositions({
  //       1: { left: 100, top: 100 },
  //       2: { left: 300, top: 100 },
  //       3: { left: 200, top: 300 },
  //       4: { left: 400, top: 200 },
  //     });
  //     setWayPoints([1, 2, 3, 4]);
  //   }, 5000);
  // }, []);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setWayPoints([1, 2, 3, 4, 1, 3]);
  //   }, 7000);
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

  const uploadGraph = () => {
    const file = inputFileRef.current?.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const data = JSON.parse(result);
        setVertices(data.vertices);
        setEdges(data.edges);
        setPositions(data.positions);
      };
      reader.readAsText(file);
    }

    inputFileRef.current!.value = "";
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
      <label htmlFor="graphFile">Upload Graph:</label>
      <input
        ref={inputFileRef}
        type="file"
        id="graphFile"
        onChange={uploadGraph}
        title="Upload Graph"
      />

      <GraphContainer>
        <GraphWithAsyncData
          vertices={vertices}
          edges={edges}
          traversalPath={traversalPath}
          animatePath
          initialPositions={positions}
          speed={1}
          onAddEdge={addEdgeHandler}
          onAddVertice={addVerticeHandler}
        />
      </GraphContainer>
    </>
  );
}

export default App;
