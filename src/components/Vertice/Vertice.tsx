import React, { forwardRef } from "react";
import "./Vertice.scss";

type VerticeProps = {
  label?: string | number;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(({ label }, ref) => {
  return (
    <div id="mydiv" ref={ref}>
      <div className="vertice">
        <span>{label}</span>
      </div>
    </div>
  );
});

export default Vertice;
