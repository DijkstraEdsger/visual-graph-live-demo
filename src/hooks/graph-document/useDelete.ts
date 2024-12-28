import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { deleteGraph } from "db/indexedDB";
import { useCallback } from "react";

export const useDelete = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();

  const deleteGraphDocument = useCallback(
    async (name: string) => {
      await deleteGraph(name);
      dispatch({ type: "DELETE_GRAPH", payload: name });
    },
    [dispatch]
  );

  return {
    state,
    deleteGraphDocument,
  };
};
