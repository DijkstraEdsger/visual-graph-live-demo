import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { renameGraph } from "db/indexedDB";

export const useDelete = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();

  const renameGraphDocument = async (oldName: string, newName: string) => {
    await renameGraph(oldName, newName);
    dispatch({ type: "RENAME_GRAPH", payload: { oldName, newName } });
  };

  return {
    state,
    renameGraphDocument,
  };
};
