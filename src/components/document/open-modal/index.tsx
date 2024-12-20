import Button from "components/Button/Button";
import Modal from "components/modal";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import { useGraphDocumentState } from "contexts/graph-document-context";
import { useGet } from "hooks/graph-document/useGet";
import React, { useEffect, useState } from "react";
import classes from "./classes.module.scss";
import { useGraph } from "contexts/graphContext";

const OpenDocument: React.FC = () => {
  const {
    ui: { openDocumentModal },
  } = useAppState();
  const dispatch = useAppDispatch();
  const state = useGraphDocumentState();
  const { getGraphDocument } = useGet();
  const { openGraph } = useGraph();
  const [selectedDocument, setSelectedDocument] = useState<string | null>(null);

  const handleSelectDocument = (graphName: string) => {
    setSelectedDocument(graphName);
  };

  const cancelHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_OPEN_DOCUMENT_MODAL });
  };

  const handleOpenDocument = async () => {
    if (selectedDocument) {
      const graph = await getGraphDocument(selectedDocument);
      openGraph?.(graph);
      dispatch({ type: UIActionType.UI_CLOSE_OPEN_DOCUMENT_MODAL });
    }
  };

  useEffect(() => {
    if (!openDocumentModal?.isOpen) {
      setSelectedDocument(null);
    }
  }, [openDocumentModal?.isOpen]);

  return (
    <Modal
      isOpen={openDocumentModal?.isOpen}
      onClose={cancelHandler}
      title="Open Document"
    >
      {/* <ul>
        {state.graphs.map((graph) => (
          <li key={graph.name}>
            <button
              type="button"
              onClick={() => handleSelectDocument(graph.name)}
            >
              {graph.name}
            </button>
          </li>
        ))}
      </ul> */}
      {/* <ul className={classes["document-list"]}>
        {state.graphs.map((graph) => (
          <li key={graph.name} className={classes["document-list-item"]}>
            <button
              type="button"
              className={classes["document-list-item-button"]}
              onClick={() => handleSelectDocument(graph.name)}
            >
              {graph.name}
            </button>
          </li>
        ))}
      </ul> */}
      <ul className={classes["document-list"]}>
        {state.graphs.map((graph) => (
          <li
            key={graph.name}
            className={`${classes["document-list-item"]} ${
              selectedDocument === graph.name ? classes.selected : ""
            }`}
          >
            <button
              type="button"
              className={classes["document-list-item-button"]}
              onClick={() => handleSelectDocument(graph.name)}
              onDoubleClick={handleOpenDocument}
            >
              {graph.name}
            </button>
          </li>
        ))}
      </ul>
      <div className={classes.actions}>
        <Button
          onClick={() => handleOpenDocument()}
          disabled={!selectedDocument}
          className={classes.actions__save}
        >
          Open
        </Button>
        <Button onClick={cancelHandler} className={classes.actions__cancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default OpenDocument;
