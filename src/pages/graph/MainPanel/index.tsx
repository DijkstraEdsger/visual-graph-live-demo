import React from "react";
import classes from "./classes.module.scss";
import useMainPanel from "./useMainPanel";
import Switch from "components/Switch/Switch";
import { GraphContainer } from "contexts/graphContainerContext";
import withAsyncData from "components/HOCs/withAsyncData";
import Graph from "components/Graph/Graph";
import StatusBar from "../StatusBar";

const GraphWithAsyncData = withAsyncData(Graph);

const MainPanel: React.FC = () => {
  const {
    vertices,
    edges,
    isDirected,
    traversalPath,
    highlightedVertices,
    highlightedEdges,
    setIsDirectedHandler,
    addEdgeHandler,
    addVerticeHandler,
  } = useMainPanel();

  return (
    <div className={classes.panel}>
      <Switch
        checked={isDirected || false}
        onChange={(checked) => setIsDirectedHandler(checked)}
      >
        Directed
      </Switch>
      <GraphContainer>
        <GraphWithAsyncData
          vertices={vertices}
          edges={edges}
          traversalPath={traversalPath}
          highlightedEdges={highlightedEdges}
          highlightedVertices={highlightedVertices}
          animatePath
          speed={2}
          onAddEdge={addEdgeHandler}
          onAddVertice={addVerticeHandler}
          isDirected={isDirected}
        />
        <StatusBar />
      </GraphContainer>
    </div>
  );
};

export default MainPanel;
