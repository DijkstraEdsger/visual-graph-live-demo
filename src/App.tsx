import React from "react";
import "./App.css";
import Vertice from "components/Vertice/Vertice";
import Drag from "components/Drag/Drag";

function App() {
  return (
    <div className="App">
      <Drag>
        <Vertice label={1} />
      </Drag>
    </div>
  );
}

export default App;
