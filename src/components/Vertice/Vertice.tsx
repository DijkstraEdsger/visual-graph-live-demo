import React, { forwardRef } from "react";
import "./Vertice.scss";
import Drag from "components/Drag/Drag";
import { InitialPositionType } from "types/graph";

type VerticeProps = {
  label?: string | number;
  isVisited?: boolean;
  initialPosition?: InitialPositionType;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(
  ({ label, isVisited = false, initialPosition }, ref) => {
    return (
      <Drag ref={ref} initialPosition={initialPosition}>
        <div
          className="vertice"
          style={{
            backgroundColor: isVisited ? "green" : "#00bff",
          }}
        >
          <span>{label}</span>
        </div>
      </Drag>
    );
  }
);

export default Vertice;
