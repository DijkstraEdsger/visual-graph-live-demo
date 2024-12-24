import React from "react";
import classes from "./classes.module.scss";
import useGraphPropertiesPanelVM from "./useGraphPropertiesPanelVM";
import { MathJax } from "better-react-mathjax";

const GraphPropertiesPanel: React.FC = () => {
  const { numberOfEdges, numberOfVertices } = useGraphPropertiesPanelVM();

  return (
    <div className={classes.panel}>
      <header className={classes.panel__header}>
        <h2>Graph Properties</h2>
      </header>
      <p>Vertices: {numberOfVertices}</p>
      <p>Edges: {numberOfEdges}</p>
      {/* <p>
        <MathJax>\( G = (V, A) \)</MathJax>
      </p>
      <p>
        <MathJax>{`\\( \\left| V \\right| = ${numberOfVertices} \\)`}</MathJax>
      </p>
      <p>
        <MathJax>{`\\( \\left| A \\right| = ${numberOfEdges} \\)`}</MathJax>
      </p> */}
      <p>Degree: -</p>
      <p>Size: -</p>
      <p>Bipartite: -</p>
    </div>
  );
};

export default GraphPropertiesPanel;
