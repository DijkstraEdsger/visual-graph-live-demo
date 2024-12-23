import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { deleteGraph } from "db/indexedDB";

export const useDelete = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();

  const deleteGraphDocument = async (name: string) => {
    await deleteGraph(name);
    dispatch({ type: "DELETE_GRAPH", payload: name });
  };

  return {
    state,
    deleteGraphDocument,
  };
};
