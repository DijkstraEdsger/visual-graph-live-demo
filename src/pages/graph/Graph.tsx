import DijkstraInputs from "components/AlgorithmsInputs/DijkstraInputs/DijkstraInputs";
import Graph from "components/Graph/Graph";
import withAsyncData from "components/HOCs/withAsyncData";
import { GraphContainer } from "contexts/graphContainerContext";
import { useGraph } from "contexts/graphContext";
import { ActiveAlgorithm } from "types/graph";
import classes from "./classes.module.scss";
import Switch from "components/Switch/Switch";

const GraphWithAsyncData = withAsyncData(Graph);

const GraphPage = () => {
  const {
    vertices,
    edges,
    traversalPath,
    positions,
    activeAlgorithm,
    algorithms,
    isDirected,
    setIsDirectedHandler,
    addEdgeHandler,
    addVerticeHandler,
    cleanPath,
  } = useGraph();

  return (
    <div className={classes["page-container"]}>
      <div className={classes["parameters-section"]}>
        <header className={classes["header-parameters"]}>
          {activeAlgorithm}
        </header>
        {activeAlgorithm === ActiveAlgorithm.DIJKSTRA && (
          <DijkstraInputs
            onRunDijkstra={(startNode, endNode) =>
              algorithms?.dijkstra(startNode, endNode)
            }
            onCleanPath={cleanPath}
          />
        )}
      </div>
      <div className={classes["graph-section"]}>
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
            animatePath
            initialPositions={positions}
            speed={2}
            onAddEdge={addEdgeHandler}
            onAddVertice={addVerticeHandler}
            isDirected={isDirected}
          />
        </GraphContainer>
      </div>
    </div>
  );
};

export default GraphPage;
