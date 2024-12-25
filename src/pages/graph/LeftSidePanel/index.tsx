import React from "react";
import classes from "./classes.module.scss";
import PropertiesSection from "./properties-section";
import AlgorithmControlSection from "./algorithm-control-section";

const LeftSidePanel: React.FC = () => {
  return (
    <div className={classes.panel}>
      <header className={classes.panel__header}>
        <h2>Graph Control Panel</h2>
      </header>
      <div className={classes.panel__sections}>
        <PropertiesSection />
        <AlgorithmControlSection />
      </div>
    </div>
  );
};

export default LeftSidePanel;
