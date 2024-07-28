import Graph from "components/Graph/Graph";
import withAsyncData from "components/HOCs/withAsyncData";
import { GraphContainer } from "contexts/graphContainerContext";
import { useGraph } from "contexts/graphContext";

const GraphWithAsyncData = withAsyncData(Graph);

const GraphPage = () => {
  const {
    vertices,
    edges,
    traversalPath,
    positions,
    addEdgeHandler,
    addVerticeHandler,
  } = useGraph();

  return (
    <GraphContainer>
      <GraphWithAsyncData
        vertices={vertices}
        edges={edges}
        traversalPath={traversalPath}
        animatePath
        initialPositions={positions}
        speed={1}
        onAddEdge={addEdgeHandler}
        onAddVertice={addVerticeHandler}
      />
    </GraphContainer>
  );
};

export default GraphPage;
