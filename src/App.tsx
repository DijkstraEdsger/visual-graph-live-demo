import React, { useEffect, useState } from "react";
import "./App.css";

import { GraphProvider } from "contexts/graphContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import GraphPage from "pages/graph/Graph";
import "./scss/src/global.scss";
import { IGraphAdapter } from "interfaces/IGraphAdapter";
import GraphlibAdapter from "adapters/GraphlibAdapter";
import { IShortestPath, NodeId } from "types/graph";

interface Node {
  id: string;
  label: string;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

interface ShortestPaths {
  [key: string]: {
    distance: number;
    predecessor: string | null;
  };
}

interface CustomGraphVisualizationProps {
  nodes: Node[];
  edges: Edge[];
  shortestPaths: ShortestPaths;
}

function App() {
  const [graphAdapter, setGraphAdapter] = useState<IGraphAdapter | null>(null);
  const [shortestPaths, setShortestPaths] = useState<
    Record<NodeId, IShortestPath>
  >({});

  useEffect(() => {
    const adapter = new GraphlibAdapter(); // or new GraphologyAdapter()
    adapter.createGraph();

    adapter.addNode({ id: "A", label: "A" });
    adapter.addNode({ id: "B", label: "B" });
    adapter.addNode({ id: "C", label: "C" });
    adapter.addNode({ id: "D", label: "D" });

    adapter.addEdge({ source: "A", target: "B", weight: 1 });
    adapter.addEdge({ source: "A", target: "C", weight: 4 });
    adapter.addEdge({ source: "B", target: "D", weight: 5 });
    adapter.addEdge({ source: "C", target: "D", weight: 1 });
    adapter.addEdge({ source: "B", target: "C", weight: 2 });

    setGraphAdapter(adapter);

    const paths = adapter.runDijkstra("A");
    setShortestPaths(paths);
  }, []);

  return (
    <GraphProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<GraphPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </GraphProvider>
  );
}

export default App;
