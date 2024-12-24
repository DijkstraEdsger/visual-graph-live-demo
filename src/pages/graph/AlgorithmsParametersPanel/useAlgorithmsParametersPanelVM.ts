import { useGraph } from "contexts/graphContext";

const useAlgorithmsParametersPanelVM = () => {
  const { activeAlgorithm, algorithms, cleanPath, cleanHighlighted } =
    useGraph();

  return {
    activeAlgorithm,
    algorithms,
    cleanPath,
    cleanHighlighted,
  };
};

export default useAlgorithmsParametersPanelVM;
