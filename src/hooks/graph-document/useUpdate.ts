import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { useGraph } from "contexts/graphContext";
import { getAllGraphs, updateGraph } from "db/indexedDB";
import { useEffect, useState } from "react";

export const useUpdate = () => {
  const state = useGraphDocumentState();
  const dispatch = useGraphDocumentDispatch();
  const [pending, setPending] = useState(false);
  const { graph } = useGraph();
  const { openedDocument } = useGraphDocumentState();

  useEffect(() => {
    const fetchGraphs = async () => {
      const graphs = await getAllGraphs();
      dispatch({ type: "SET_GRAPHS", payload: graphs });
    };

    fetchGraphs();
  }, [dispatch]);

  const updateGraphDocument = async () => {
    const documentName = openedDocument?.name ?? "";
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
