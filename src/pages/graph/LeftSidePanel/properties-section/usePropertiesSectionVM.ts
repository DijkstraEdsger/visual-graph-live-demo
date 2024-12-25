import { useGraph } from "contexts/graphContext";

const usePropertiesSectionVM = () => {
  const { graph, isComplete } = useGraph();

  return {
    numberOfVertices: graph.vertices.length,
    numberOfEdges: graph.edges.length,
    isComplete,
  };
};

export default usePropertiesSectionVM;
