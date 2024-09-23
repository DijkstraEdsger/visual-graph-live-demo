import React, { useEffect, useState } from "react";
import "./App.css";

import { GraphProvider } from "contexts/graphContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import GraphPage from "pages/graph/Graph";
import "./scss/src/global.scss";
import { IGraphAdapter } from "interfaces/IGraphAdapter";
import GraphlibAdapter from "adapters/GraphlibAdapter";

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
  const [shortestPaths, setShortestPaths] = useState<Record<
    string,
    { distance: number; predecessor: string | null }
  > | null>(null);

  useEffect(() => {
    const adapter = new GraphlibAdapter(); // or new GraphologyAdapter()
    adapter.createGraph();

    adapter.addNode({ id: "A", label: "A" });
    adapter.addNode({ id: "B", label: "B" });
    adapter.addNode({ id: "C", label: "C" });
    adapter.addNode({ id: "D", label: "D" });

    adapter.addEdge("A", "B", 1);
    adapter.addEdge("A", "C", 4);
    adapter.addEdge("B", "C", 2);
    adapter.addEdge("B", "D", 5);
    adapter.addEdge("C", "D", 1);

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
