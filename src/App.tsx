import React from "react";
import "./App.css";
import Vertice from "components/Vertice/Vertice";
import Drag from "components/Drag/Drag";
import Line from "components/Line/Line";

function App() {
  return (
    <div className="App">
      <Line>
        <Drag>
          <Vertice label={1} />
        </Drag>
        <Drag>
          <Vertice label={2} />
        </Drag>
      </Line>
      <Line>
        <Drag>
          <Vertice label={3} />
        </Drag>
        <Drag>
          <Vertice label={4} />
        </Drag>
      </Line>
    </div>
  );
}

export default App;
