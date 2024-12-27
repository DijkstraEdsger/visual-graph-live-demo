import React, { useCallback } from "react";
import Icon from "components/Icon";
import classes from "./classes.module.scss";

interface DeleteButtonProps {
  documentName?: string;
  onClick?: (documentName: string) => void;
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  documentName = "",
  onClick,
}) => {
  const handleOnClick = useCallback(() => {
    onClick?.(documentName);
  }, [documentName, onClick]);

  return (
    <button
      type="button"
      onClick={handleOnClick}
      className={classes.delete_button}
      aria-label="Delete document"
    >
      <Icon name="delete" size="16px" />
    </button>
  );
};

export default DeleteButton;
