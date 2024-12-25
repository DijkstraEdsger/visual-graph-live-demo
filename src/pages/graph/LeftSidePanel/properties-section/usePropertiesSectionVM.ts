import { useGraph } from "contexts/graphContext";

const usePropertiesSectionVM = () => {
  const { graph } = useGraph();

  return {
    numberOfVertices: graph.vertices.length,
    numberOfEdges: graph.edges.length,
  };
};

export default usePropertiesSectionVM;
