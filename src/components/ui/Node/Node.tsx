import React from "react";
import styles from "./styles.module.scss";

type NodeProps = {
  label?: string | number;
};

const Node: React.FC<NodeProps> = ({ label }) => {
  return (
    <div id={styles.mydiv}>
      <div className={styles.vertice}>
        <span>{label}</span>
      </div>
    </div>
  );
};

export default Node;
