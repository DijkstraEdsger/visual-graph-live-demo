import React from "react";
import "./App.css";

import { GraphProvider } from "contexts/graphContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import GraphPage from "pages/graph/Graph";
import "./styles/main.scss";
import { ThemeProvider } from "contexts/themeContext";
import { GraphDocumentProvider } from "contexts/graph-document-context";
import { AppProvider } from "contexts/app-context/root/provider";
import { MathJaxContext } from "better-react-mathjax";

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
    // <MathJaxContext>
    <AppProvider>
      <ThemeProvider>
        <GraphDocumentProvider>
          <GraphProvider>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Layout />}>
                  <Route index element={<GraphPage />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </GraphProvider>
        </GraphDocumentProvider>
      </ThemeProvider>
    </AppProvider>
    // </MathJaxContext>
  );
}

export default App;
