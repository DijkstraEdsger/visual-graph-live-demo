import React from "react";
import "./App.css";

import { GraphProvider } from "contexts/graphContext";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Layout from "components/Layout/Layout";
import GraphPage from "pages/graph/Graph";
import './scss/src/global.scss';

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
