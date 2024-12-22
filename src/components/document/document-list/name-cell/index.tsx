import React from "react";
import Icon from "components/Icon";
import classes from "./classes.module.scss";

interface NameCellProps {
  name: string;
}

const NameCell: React.FC<NameCellProps> = ({ name }) => {
  return (
    <span className={classes.name_cell}>
      <Icon name="file" size="16px" />
      {name}
    </span>
  );
};

export default NameCell;
