import React, { useId, useState } from "react";
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

const SaveDocumentModal: React.FC = () => {
  const [name, setName] = useState("");
  const id = useId();
  const {
    ui: { saveDocumentModal },
  } = useAppState();
  const dispatch = useAppDispatch();
  const { pending, addNewGraphDocument } = useAdd();

  if (!saveDocumentModal?.isOpen) {
    return null;
  }

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const confirmHandler = async () => {
    await addNewGraphDocument?.(name);
    dispatch({ type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL });
  };

  const cancelHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL });
  };

  return (
    <Modal title="Save" isOpen onClose={cancelHandler}>
      <TextField
        placeholder="Enter document name"
        onChange={changeNameHandler}
        value={name}
        label="Name"
        type="text"
        name="name"
        id={id}
      />
      <div className={classes.actions}>
        <Button
          onClick={confirmHandler}
          disabled={!name || pending}
          className={classes.actions__save}
        >
          {pending ? "Saving..." : "Save"}
        </Button>
        <Button onClick={cancelHandler} className={classes.actions__cancel}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default SaveDocumentModal;
