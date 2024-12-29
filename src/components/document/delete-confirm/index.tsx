import React, { memo, useEffect, useRef } from "react";
import Modal from "components/modal";
import classes from "./classes.module.scss";
import Button from "components/Button/Button";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import { useDelete } from "hooks/graph-document/useDelete";

const DeleteConfirmModal: React.FC = () => {
  const {
    ui: { confirmDeleteModal },
  } = useAppState();
  const dispatch = useAppDispatch();
  const { deleteGraphDocument } = useDelete();
  const buttonCancelRef = useRef<HTMLButtonElement>(null);
  const { name } = confirmDeleteModal?.data ?? {};

  useEffect(() => {
    if (buttonCancelRef.current && confirmDeleteModal?.isOpen) {
      buttonCancelRef.current.focus();
    }
  }, [confirmDeleteModal?.isOpen]);

  const deleteHandler = async () => {
    await deleteGraphDocument(confirmDeleteModal?.data?.name ?? "");
    dispatch({ type: UIActionType.UI_CLOSE_CONFIRM_DELETE_MODAL });
  };

  const cancelHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_CONFIRM_DELETE_MODAL });
  };

  return (
    <Modal
      title="Confirm delete"
      isOpen={confirmDeleteModal?.isOpen}
      onClose={cancelHandler}
      maxWidth={460}
    >
      <div className={classes.alert}>
        <p className={classes.alert__text}>
          Are you sure you want to delete "{name}"?
        </p>
      </div>
      <div className={classes.actions}>
        <Button
          ref={buttonCancelRef}
          onClick={cancelHandler}
          className={classes.actions__cancel}
        >
          Cancel
        </Button>
        <Button
          color="error"
          onClick={deleteHandler}
          className={classes.actions__save}
        >
          Delete
        </Button>
      </div>
    </Modal>
  );
};

export default memo(DeleteConfirmModal);
