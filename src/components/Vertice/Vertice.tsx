import React, { forwardRef } from "react";
import "./Vertice.scss";
import Drag from "components/Drag/Drag";

type VerticeProps = {
  label?: string | number;
  color?: string;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(
  ({ label, color = "#00bfff" }, ref) => {
    return (
      <Drag ref={ref}>
        <div
          className="vertice"
          style={{
            backgroundColor: color,
          }}
        >
          <span>{label}</span>
        </div>
      </Drag>
    );
  }
);

export default Vertice;
