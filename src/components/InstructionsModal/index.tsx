import React from "react";
import Modal from "components/modal";
import classes from "./classes.module.scss";
import {
  useAppDispatch,
  useAppState,
} from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";

const InstructionsModal: React.FC = () => {
  const {
    ui: { instructionsModal },
  } = useAppState();
  const dispatch = useAppDispatch();

  const closeHandler = () => {
    dispatch({ type: UIActionType.UI_CLOSE_INSTRUCTIONS_MODAL });
  };

  return (
    <Modal
      title="How to Use Graph Builder"
      isOpen={instructionsModal?.isOpen}
      onClose={closeHandler}
      maxWidth={600}
    >
      <h3 className={classes.instructions__heading}>Adding a Vertex</h3>
      <p className={classes.instructions__text}>
        To add a vertex, <b>double-click</b> on the main panel.
      </p>
      <h3 className={classes.instructions__heading}>Adding an Edge</h3>
      <p className={classes.instructions__text}>
        To add an edge, <b>drag</b> from the <b>tooltip arrow icon</b> of the
        vertex to another vertex.
      </p>
      <h3 className={classes.instructions__heading}>Moving a Vertex</h3>
      <p className={classes.instructions__text}>
        To move a vertex, simply <b>drag</b> it to the desired location.
      </p>
      <h3 className={classes.instructions__heading}>Deleting a Vertex</h3>
      <p className={classes.instructions__text}>
        To delete a vertex, <b>click</b> on the <b>tooltip cross icon</b> of the
        vertex.
      </p>
      <h3 className={classes.instructions__heading}>Deleting an Edge</h3>
      <p className={classes.instructions__text}>
        To delete an edge, <b>click</b> on the <b>tooltip cross icon</b> of the
        edge.
      </p>
    </Modal>
  );
};

export default InstructionsModal;
