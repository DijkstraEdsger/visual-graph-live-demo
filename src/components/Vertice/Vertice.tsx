import React, { forwardRef } from "react";
import "./Vertice.scss";
import Drag from "components/Drag/Drag";

type VerticeProps = {
  label?: string | number;
  isVisited?: boolean;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(
  ({ label, isVisited = false }, ref) => {
    return (
      <Drag ref={ref}>
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
