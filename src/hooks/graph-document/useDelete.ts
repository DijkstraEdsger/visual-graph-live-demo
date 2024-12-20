import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { deleteGraph, getAllGraphs } from "db/indexedDB";
import { useEffect } from "react";

export const useDelete = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();

  useEffect(() => {
    const fetchGraphs = async () => {
      const graphs = await getAllGraphs();
      dispatch({ type: "SET_GRAPHS", payload: graphs });
    };

    fetchGraphs();
  }, [dispatch]);

  const deleteGraphDocument = async (name: string) => {
    await deleteGraph(name);
    dispatch({ type: "DELETE_GRAPH", payload: name });
  };

  return {
    state,
    deleteGraphDocument,
  };
};
