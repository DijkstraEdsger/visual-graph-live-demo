import React from "react";
import "./App.css";
import Vertice from "components/Vertice/Vertice";
import Line from "components/Line/Line";

function App() {
  const firstItemRef = React.useRef<HTMLDivElement>(null);
  const secondItemRef = React.useRef<HTMLDivElement>(null);
  const thirdItemRef = React.useRef<HTMLDivElement>(null);

  return (
    <div>
      <Vertice label={1} ref={firstItemRef} />
      <Vertice label={2} ref={secondItemRef} />
      <Vertice label={3} ref={thirdItemRef} />
      <Line div1Ref={firstItemRef} div2Ref={secondItemRef} />
      <Line div1Ref={firstItemRef} div2Ref={thirdItemRef} />
      <Line div1Ref={secondItemRef} div2Ref={thirdItemRef} />
    </div>
  );
}

export default App;
