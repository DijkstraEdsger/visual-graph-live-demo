import React, { useId, useState } from "react";
import Modal from "components/modal";
import TextField from "components/TextField/TextField";
import classes from "./classes.module.scss";
import Button from "components/Button/Button";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { useGraph } from "contexts/graphContext";
import { UIActionType } from "contexts/app-context/ui/types";

const SaveDocumentModal: React.FC = () => {
  const [name, setName] = useState("");
  const [pending, setPending] = useState(false);
  const id = useId();
  const {
    ui: { saveDocumentModal },
  } = useAppState();
  const { addGraphDocument } = useGraph();
  const dispatch = useAppDispatch();

  if (!saveDocumentModal?.isOpen) {
    return null;
  }

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const confirmHandler = async () => {
    setPending(true);
    await addGraphDocument?.(name);
    setPending(false);
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
