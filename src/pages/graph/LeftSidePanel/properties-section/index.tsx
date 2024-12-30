import React from "react";
import classes from "./classes.module.scss";
import { MathJax } from "better-react-mathjax";
import usePropertiesSectionVM from "./usePropertiesSectionVM";

const PropertiesSection: React.FC = () => {
  const { numberOfEdges, numberOfVertices, isComplete } =
    usePropertiesSectionVM();

  return (
    <section className={classes.section}>
      <h2>Properties Overview</h2>
      <div className={classes.section__body}>
        <p>Vertices: {numberOfVertices}</p>
        <p>Edges: {numberOfEdges}</p>
        <p>
          Is complete: {isComplete ? "Yes" : "No"}{" "}
          {isComplete && (
            <var>
              &#40;K<sub>{numberOfVertices}</sub>&#41;
            </var>
          )}
        </p>
        {/* <p>Bipartite: -</p> */}
      </div>
      {/* <p>
        <MathJax>\( G = (V, A) \)</MathJax>
      </p>
      <p>
        <MathJax>{`\\( \\left| V \\right| = ${numberOfVertices} \\)`}</MathJax>
      </p>
      <p>
        <MathJax>{`\\( \\left| A \\right| = ${numberOfEdges} \\)`}</MathJax>
      </p> */}
    </section>
  );
};

export default PropertiesSection;
