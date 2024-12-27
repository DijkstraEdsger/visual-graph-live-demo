import { useGraph } from "contexts/graphContext";
import { useEffect } from "react";

const useMainPanel = () => {
  const {
    vertices,
    edges,
    traversalPath,
    highlightedEdges,
    highlightedVertices,
    isDirected,
    dfsTraversal,
    setIsDirectedHandler,
    addEdgeHandler,
    addVerticeHandler,
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

  return {
    isDirected,
    setIsDirectedHandler,
    vertices,
    edges,
    traversalPath,
    highlightedEdges,
    highlightedVertices,
    dfsTraversal,
    addEdgeHandler,
    addVerticeHandler,
  };
};

export default useMainPanel;
