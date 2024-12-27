import { useGraph } from "contexts/graphContext";

const useAlgorithmControlSectionVM = () => {
  const {
    activeAlgorithm,
    algorithms,
    cleanPath,
    cleanHighlighted,
    cleanDfsResult,
  } = useGraph();

  return {
    activeAlgorithm,
    algorithms,
    cleanPath,
    cleanHighlighted,
    cleanDfsResult,
  };
};

export default useAlgorithmControlSectionVM;
