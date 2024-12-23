import DijkstraInputs from "components/AlgorithmsInputs/DijkstraInputs/DijkstraInputs";
import Graph from "components/Graph/Graph";
import withAsyncData from "components/HOCs/withAsyncData";
import { GraphContainer } from "contexts/graphContainerContext";
import { useGraph } from "contexts/graphContext";
import { ActiveAlgorithm } from "types/graph";
import classes from "./classes.module.scss";
import Switch from "components/Switch/Switch";
import BellmanFordInputs from "components/AlgorithmsInputs/BellmanFordInputs/BellmanFordInputs";
import Prim from "components/AlgorithmsInputs/Prim/Prim";
import { useEffect } from "react";
import SaveDocumentModal from "components/document/save-modal";
import OpenDocument from "components/document/open-modal";
import SaveConfirmExistsModal from "components/document/save-confirm-exists";
import WantToSave from "components/document/want-to-save";

const GraphWithAsyncData = withAsyncData(Graph);

const GraphPage = () => {
  const {
    vertices,
    edges,
    traversalPath,
    highlightedEdges,
    highlightedVertices,
    activeAlgorithm,
    algorithms,
    isDirected,
    setIsDirectedHandler,
    addEdgeHandler,
    addVerticeHandler,
    cleanPath,
    cleanHighlighted,
    undo,
    redo,
  } = useGraph();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.ctrlKey || event.metaKey) && event.key === "z") {
        undo?.();
      }

      if ((event.ctrlKey || event.metaKey) && event.key === "y") {
        redo?.();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [undo, redo]);

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
        {activeAlgorithm === ActiveAlgorithm.BELLMAN_FORD && (
          <BellmanFordInputs
            onRun={(startNode, endNode) =>
              algorithms?.bellmanFord(startNode, endNode)
            }
            onCleanPath={cleanPath}
          />
        )}
        {activeAlgorithm === ActiveAlgorithm.PRIM && (
          <Prim onRun={() => algorithms?.prim()} onClean={cleanHighlighted} />
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
            highlightedEdges={highlightedEdges}
            highlightedVertices={highlightedVertices}
            animatePath
            speed={2}
            onAddEdge={addEdgeHandler}
            onAddVertice={addVerticeHandler}
            isDirected={isDirected}
          />
        </GraphContainer>
      </div>
      <div className={classes["graph-properties-section"]}>
        <header className={classes["header-graph-properties"]}>
          Properties
        </header>
      </div>
      <SaveDocumentModal />
      <SaveConfirmExistsModal />
      <OpenDocument />
      <WantToSave />
    </div>
  );
};

export default GraphPage;
