import React, { useEffect, useRef } from "react";
import Modal from "components/modal";
import classes from "./classes.module.scss";
import Button from "components/Button/Button";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import { useUpdate } from "hooks/graph-document/useUpdate";
import { useGraph } from "contexts/graphContext";
import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";

const WantToSave: React.FC = () => {
  const {
    ui: { wantToSaveModal },
  } = useAppState();
  const dispatch = useAppDispatch();
  const { updateGraphDocument } = useUpdate();
  const buttonSaveRef = useRef<HTMLButtonElement>(null);
  const { cleanGraph } = useGraph();
  const documentDispatch = useGraphDocumentDispatch();
  const { openedDocument, isNewDocumentPending, isPendingToOpen } =
    useGraphDocumentState();

  useEffect(() => {
    if (buttonSaveRef.current && wantToSaveModal?.isOpen) {
      buttonSaveRef.current.focus();
    }
  }, [wantToSaveModal?.isOpen]);

  const saveHandler = async () => {
    if (isNewDocumentPending) {
      if (openedDocument) {
        await updateGraphDocument();
        dispatch({ type: UIActionType.UI_CLOSE_WANT_TO_SAVE_MODAL });
        documentDispatch({
          type: "SET_IS_NEW_DOCUMENT_PENDING",
          payload: false,
        });
        cleanGraph?.();
      } else {
        dispatch({ type: UIActionType.UI_CLOSE_WANT_TO_SAVE_MODAL });
        dispatch({ type: UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL });
      }
    }

    if (isPendingToOpen) {
      if (openedDocument) {
        await updateGraphDocument();
        dispatch({ type: UIActionType.UI_CLOSE_WANT_TO_SAVE_MODAL });
        documentDispatch({
          type: "SET_IS_PENDING_TO_OPEN",
          payload: false,
        });
        dispatch({ type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL });
      } else {
        dispatch({ type: UIActionType.UI_CLOSE_WANT_TO_SAVE_MODAL });
        dispatch({ type: UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL });
      }
    }
  };

  const cancelHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_WANT_TO_SAVE_MODAL });
    documentDispatch({ type: "SET_IS_NEW_DOCUMENT_PENDING", payload: false });
    documentDispatch({ type: "SET_IS_PENDING_TO_OPEN", payload: false });
  };

  const doNotSaveHandler = () => {
    if (isNewDocumentPending) {
      cleanGraph?.();
      documentDispatch({ type: "SET_IS_NEW_DOCUMENT_PENDING", payload: false });
      documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: false });
      documentDispatch({
        type: "OPEN_GRAPH",
        payload: null,
      });
    }

    if (isPendingToOpen) {
      dispatch({ type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL });
      documentDispatch({ type: "SET_IS_PENDING_TO_OPEN", payload: false });
    }

    dispatch({ type: UIActionType.UI_CLOSE_WANT_TO_SAVE_MODAL });
  };

  return (
    <Modal
      title="Graph Builder"
      isOpen={wantToSaveModal?.isOpen}
      onClose={cancelHandler}
      maxWidth={460}
    >
      <div className={classes.alert}>
        <p className={classes.alert__text}>Do you want to save the changes?</p>
      </div>
      <div className={classes.actions}>
        <Button onClick={cancelHandler} className={classes.actions__cancel}>
          Cancel
        </Button>
        <Button
          onClick={doNotSaveHandler}
          className={classes.actions__do_not_save}
        >
          Do not save
        </Button>
        <Button
          ref={buttonSaveRef}
          onClick={saveHandler}
          className={classes.actions__save}
        >
          Save
        </Button>
      </div>
    </Modal>
  );
};

export default WantToSave;
