import React, { useEffect, useId, useRef } from "react";
import Modal from "components/modal";
import classes from "./classes.module.scss";
import Button from "components/Button/Button";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import { useUpdate } from "hooks/graph-document/useUpdate";
import Icon from "components/Icon";
import { useGraph } from "contexts/graphContext";
import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";

const SaveConfirmExistsModal: React.FC = () => {
  const {
    ui: { confirmSaveModal },
  } = useAppState();
  const dispatch = useAppDispatch();
  const { updateGraphDocument } = useUpdate();
  const buttonNoRef = useRef<HTMLButtonElement>(null);
  const { cleanGraph } = useGraph();
  const documentDispatch = useGraphDocumentDispatch();
  const { isNewDocumentPending, isPendingToOpen } = useGraphDocumentState();

  useEffect(() => {
    if (buttonNoRef.current && confirmSaveModal?.isOpen) {
      buttonNoRef.current.focus();
    }
  }, [confirmSaveModal?.isOpen]);

  const yesHandler = async () => {
    await updateGraphDocument?.(confirmSaveModal?.data?.name ?? "");
    dispatch({ type: UIActionType.UI_CLOSE_SAVE_DOCUMENT_MODAL });
    dispatch({ type: UIActionType.UI_CLOSE_CONFIRM_SAVE_MODAL });

    if (isNewDocumentPending) {
      documentDispatch({ type: "SET_IS_NEW_DOCUMENT_PENDING", payload: false });
      cleanGraph?.();
    }

    if (isPendingToOpen) {
      dispatch({ type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL });
      documentDispatch({
        type: "SET_IS_PENDING_TO_OPEN",
        payload: false,
      });
    }
  };

  const noHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_CONFIRM_SAVE_MODAL });
  };

  return (
    <Modal
      title="Confirm save"
      isOpen={confirmSaveModal?.isOpen}
      onClose={noHandler}
      maxWidth={340}
    >
      <div className={classes.alert}>
        <div className={classes.alert__icon}>
          <Icon name="alert-triangle" size="36px" color="#ffc107" />
        </div>
        <p className={classes.alert__text}>
          {confirmSaveModal?.data?.name} already exists. Do you want to replace
          it?
        </p>
      </div>
      <div className={classes.actions}>
        <Button
          ref={buttonNoRef}
          onClick={noHandler}
          className={classes.actions__no}
        >
          No
        </Button>
        <Button onClick={yesHandler} className={classes.actions__yes}>
          Yes
        </Button>
      </div>
    </Modal>
  );
};

export default SaveConfirmExistsModal;
