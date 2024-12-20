import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { getAllGraphs, getGraph, renameGraph } from "db/indexedDB";
import { useEffect } from "react";

export const useGet = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();

  useEffect(() => {
    const fetchGraphs = async () => {
      const graphs = await getAllGraphs();
      dispatch({ type: "SET_GRAPHS", payload: graphs });
    };

    fetchGraphs();
  }, [dispatch]);

  const getGraphDocument = async (name: string) => {
    return await getGraph(name);
  };

  return {
    state,
    getGraphDocument,
  };
};
