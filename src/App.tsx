import React from "react";
import "./App.css";

import { GraphProvider } from "contexts/graphContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import GraphPage from "pages/graph/Graph";
import "./styles/main.scss";

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
