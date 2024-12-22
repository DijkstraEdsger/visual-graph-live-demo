import { useState } from "react";
import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { useGraph } from "contexts/graphContext";
import { addGraph } from "db/indexedDB";

export const useAdd = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();
  const [pending, setPending] = useState(false);
  const { graph } = useGraph();

  const addNewGraphDocument = async (name: string) => {
    setPending(true);
    await addGraph(name, graph);
    setPending(false);
    dispatch({ type: "ADD_GRAPH", payload: { name, data: graph } });
  };

  return {
    state,
    pending,
    addNewGraphDocument,
  };
};
