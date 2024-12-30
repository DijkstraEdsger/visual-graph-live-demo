import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { deleteGraph } from "db/indexedDB";
import { useCallback } from "react";
import { toast } from "react-toastify";

export const useDelete = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();

  const deleteGraphDocument = useCallback(
    async (name: string) => {
      await deleteGraph(name);
      dispatch({ type: "DELETE_GRAPH", payload: name });
      toast.warn("Graph deleted.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    },
    [dispatch]
  );

  return {
    state,
    deleteGraphDocument,
  };
};
