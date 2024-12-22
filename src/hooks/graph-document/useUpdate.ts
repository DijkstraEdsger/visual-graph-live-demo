import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { useGraph } from "contexts/graphContext";
import { updateGraph } from "db/indexedDB";
import { useState } from "react";

export const useUpdate = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();
  const [pending, setPending] = useState(false);
  const { graph } = useGraph();
  const { openedDocument } = useGraphDocumentState();

  const updateGraphDocument = async (name?: string) => {
    const documentName = name ?? openedDocument?.name ?? "";
    setPending(true);
    const updatedDocument = await updateGraph(documentName, graph);
    setPending(false);
    dispatch({
      type: "UPDATE_GRAPH",
      payload: updatedDocument,
    });
  };

  return {
    state,
    pending,
    updateGraphDocument,
  };
};
