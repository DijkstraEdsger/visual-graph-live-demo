import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { addGraph, getAllGraphs } from "db/indexedDB";
import { useEffect } from "react";

export const useAdd = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();

  useEffect(() => {
    const fetchGraphs = async () => {
      const graphs = await getAllGraphs();
      dispatch({ type: "SET_GRAPHS", payload: graphs });
    };

    fetchGraphs();
  }, [dispatch]);

  const addNewGraphDocument = async (name: string, data: any) => {
    await addGraph(name, data);
    dispatch({ type: "ADD_GRAPH", payload: { name, data } });
  };

  return {
    state,
    addNewGraphDocument,
  };
};
