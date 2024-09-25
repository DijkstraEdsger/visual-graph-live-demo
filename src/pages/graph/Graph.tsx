import DijkstraInputs from "components/AlgorithmsInputs/DijkstraInputs/DijkstraInputs";
import Graph from "components/Graph/Graph";
import withAsyncData from "components/HOCs/withAsyncData";
import { GraphContainer } from "contexts/graphContainerContext";
import { useGraph } from "contexts/graphContext";
import { ActiveAlgorithm } from "types/graph";

const GraphWithAsyncData = withAsyncData(Graph);

const GraphPage = () => {
  const {
    vertices,
    edges,
    traversalPath,
    positions,
    activeAlgorithm,
    algorithms,
    addEdgeHandler,
    addVerticeHandler,
  } = useGraph();

  return (
    <>
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
      {activeAlgorithm === ActiveAlgorithm.DIJKSTRA && (
        <DijkstraInputs
          onRunDijkstra={(startNode, endNode) =>
            algorithms?.dijkstra(startNode, endNode)
          }
        />
      )}
    </>
  );
};

export default GraphPage;
