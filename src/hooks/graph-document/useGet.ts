import { useEffect, useState } from "react";
import {
  type DocumentGraph,
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { getAllGraphs, getGraph } from "db/indexedDB";
import { useGraph } from "contexts/graphContext";

export const useGet = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();
  const [loading, setLoading] = useState(false);
  const { openGraph } = useGraph();

  useEffect(() => {
    const fetchGraphs = async () => {
      const graphs = await getAllGraphs();
      dispatch({ type: "SET_GRAPHS", payload: graphs });
    };

    fetchGraphs();
  }, [dispatch]);

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
