import { useGraph } from "contexts/graphContext";

const useGraphPropertiesPanelVM = () => {
  const { graph } = useGraph();

  return {
    numberOfVertices: graph.vertices.length,
    numberOfEdges: graph.edges.length,
  };
};

export default useGraphPropertiesPanelVM;
