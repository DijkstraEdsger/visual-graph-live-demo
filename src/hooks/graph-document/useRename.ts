import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { getAllGraphs, renameGraph } from "db/indexedDB";
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

  const renameGraphDocument = async (oldName: string, newName: string) => {
    await renameGraph(oldName, newName);
    dispatch({ type: "RENAME_GRAPH", payload: { oldName, newName } });
  };

  return {
    state,
    renameGraphDocument,
  };
};
