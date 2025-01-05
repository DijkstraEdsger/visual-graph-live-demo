import React from "react";
import classes from "./classes.module.scss";
import useMainPanel from "./useMainPanel";
import Switch from "components/Switch/Switch";
import { GraphContainer } from "contexts/graphContainerContext";
import withAsyncData from "components/HOCs/withAsyncData";
import Graph from "components/Graph/Graph";

const GraphWithAsyncData = withAsyncData(Graph);

const MainPanel: React.FC = () => {
  const {
    vertices,
    edges,
    isDirected,
    traversalPath,
    highlightedVertices,
    highlightedEdges,
    dfsTraversal,
    speed,
    setIsDirectedHandler,
    addEdgeHandler,
    addVertexHandler,
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
          dfsTraversal={dfsTraversal}
          animatePath
          speed={speed}
          onAddEdge={addEdgeHandler}
          onAddVertex={addVertexHandler}
          isDirected={isDirected}
        />
      </GraphContainer>
    </div>
  );
};

export default MainPanel;
