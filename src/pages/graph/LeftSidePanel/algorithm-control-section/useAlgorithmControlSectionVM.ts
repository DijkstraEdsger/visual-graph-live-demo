import { useGraph } from "contexts/graphContext";

const useAlgorithmControlSectionVM = () => {
  const { activeAlgorithm, algorithms, cleanPath, cleanHighlighted } =
    useGraph();

  return {
    activeAlgorithm,
    algorithms,
    cleanPath,
    cleanHighlighted,
  };
};

export default useAlgorithmControlSectionVM;
