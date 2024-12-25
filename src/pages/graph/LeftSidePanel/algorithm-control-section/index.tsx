import React from "react";
import classes from "./classes.module.scss";
import { ActiveAlgorithm } from "types/graph";
import DijkstraInputs from "components/AlgorithmsInputs/DijkstraInputs/DijkstraInputs";
import BellmanFordInputs from "components/AlgorithmsInputs/BellmanFordInputs/BellmanFordInputs";
import Prim from "components/AlgorithmsInputs/Prim/Prim";
import useAlgorithmControlSectionVM from "./useAlgorithmControlSectionVM";

const AlgorithmControlSection: React.FC = () => {
  const { activeAlgorithm, algorithms, cleanPath, cleanHighlighted } =
    useAlgorithmControlSectionVM();

  return (
    <section className={classes.section}>
      <h2>Algorithm Runner</h2>
      <div className={classes.section__body}>
        <h3>{activeAlgorithm}</h3>
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
    </section>
  );
};

export default AlgorithmControlSection;
