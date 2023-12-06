import React from "react";
import "./App.css";
import Vertice from "components/Vertice/Vertice";
import Drag from "components/Drag/Drag";
import Line from "components/Line/Line";

function App() {
  return (
    <div className="App">
      {/* <Line>
        <Drag>
          <Vertice label={1} />
        </Drag>
        <Drag>
          <Vertice label={2} />
        </Drag>
      </Line>
       */}
      <Line>
        <Vertice label={1} />
        <Vertice label={2} />
      </Line>

      <Line>
        <Vertice label={3} />
        <Vertice label={4} />
      </Line>
    </div>
  );
}

export default App;
