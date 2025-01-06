import { useState } from "react";
import {
  type DocumentGraph,
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { getGraph } from "db/indexedDB";
import { useGraph } from "contexts/graphContext";

export const useGet = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();
  const [loading, setLoading] = useState(false);
  const { openGraph } = useGraph();

  const getGraphDocument = async (name: string) => {
    setLoading(true);
    const openedDocument: DocumentGraph = await getGraph(name);
    setLoading(false);
    dispatch({ type: "OPEN_GRAPH", payload: { ...openedDocument } });
    openGraph?.(openedDocument.data);
  };

  return {
    state,
    loading,
    getGraphDocument,
  };
};
