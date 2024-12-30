import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { useGraph } from "contexts/graphContext";
import { updateGraph } from "db/indexedDB";
import { useState } from "react";
import { toast } from "react-toastify";

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
      payload: state.isNewDocumentPending ? null : updatedDocument,
    });
    toast.success("Graph saved successfully!", {
      position: "bottom-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    // if (!state.isNewDocumentPending) {
    //   dispatch({ type: "OPEN_GRAPH", payload: { ...updatedDocument } });
    // }
  };

  return {
    state,
    pending,
    updateGraphDocument,
  };
};
