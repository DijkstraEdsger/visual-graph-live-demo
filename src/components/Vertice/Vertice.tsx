import React, { forwardRef } from "react";
import "./Vertice.scss";
import Drag from "components/Drag/Drag";

type VerticeProps = {
  label?: string | number;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(({ label }, ref) => {
  return (
    <Drag ref={ref}>
      <div className="vertice">
        <span>{label}</span>
      </div>
    </Drag>
  );
});

export default Vertice;
