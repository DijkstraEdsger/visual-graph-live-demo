import React, { useEffect, useId, useRef, useState } from "react";
import Modal from "components/modal";
import TextField from "components/TextField/TextField";
import classes from "./classes.module.scss";
import Button from "components/Button/Button";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import { useAdd } from "hooks/graph-document/useAdd";
import { useExists } from "hooks/graph-document/useExists";
import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { useGraph } from "contexts/graphContext";

const SaveDocumentModal: React.FC = () => {
  const [name, setName] = useState("");
  const id = useId();
  const {
    ui: { saveDocumentModal },
  } = useAppState();
  const dispatch = useAppDispatch();
  const { pending, addNewGraphDocument } = useAdd();
  const inputTextRef = useRef<HTMLInputElement>(null);
  const { existsGraphDocument } = useExists();
  const { isNewDocumentPending, isPendingToOpen } = useGraphDocumentState();
  const { cleanGraph } = useGraph();
  const documentDispatch = useGraphDocumentDispatch();

  useEffect(() => {
    if (inputTextRef.current && saveDocumentModal?.isOpen) {
      inputTextRef.current.focus();
    }

    if (!saveDocumentModal?.isOpen) {
      setName("");
    }
  }, [saveDocumentModal?.isOpen]);

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const confirmHandler = async () => {
    const exists = await existsGraphDocument(name);

    if (exists) {
      dispatch({
        type: UIActionType.UI_OPEN_CONFIRM_SAVE_MODAL,
        payload: name,
      });
    } else {
      await addNewGraphDocument?.(name);
      dispatch({ type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL });

      if (isNewDocumentPending) {
        cleanGraph?.();
        documentDispatch({
          type: "SET_IS_NEW_DOCUMENT_PENDING",
          payload: false,
        });
      }

      if (isPendingToOpen) {
        dispatch({ type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL });
        documentDispatch({
          type: "SET_IS_PENDING_TO_OPEN",
          payload: false,
        });
      }
    }
  };

  const cancelHandler = () => {
    if (isNewDocumentPending) {
      documentDispatch({ type: "SET_IS_NEW_DOCUMENT_PENDING", payload: false });
    }

    if (isPendingToOpen) {
      documentDispatch({
        type: "SET_IS_PENDING_TO_OPEN",
        payload: false,
      });
    }

    dispatch({ type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL });
  };

  return (
    <Modal
      title="Save"
      isOpen={saveDocumentModal?.isOpen}
      onClose={cancelHandler}
      disableFocused
    >
      <TextField
        placeholder="Enter document name"
        onChange={changeNameHandler}
        value={name}
        label="Name"
        type="text"
        name="name"
        id={id}
        ref={inputTextRef}
      />
      <div className={classes.actions}>
        <Button onClick={cancelHandler} className={classes.actions__cancel}>
          Cancel
        </Button>
        <Button
          onClick={confirmHandler}
          disabled={!name || pending}
          className={classes.actions__save}
        >
          {pending ? "Saving..." : "Save"}
        </Button>
      </div>
    </Modal>
  );
};

export default SaveDocumentModal;
