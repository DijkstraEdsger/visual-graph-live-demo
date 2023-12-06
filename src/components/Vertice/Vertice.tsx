import React, { forwardRef } from "react";
import "./Vertice.scss";
import Drag from "components/Drag/Drag";

type VerticeProps = {
  label?: string | number;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(({ label }, ref) => {
  return (
    <Drag ref={ref}>
      <div id="mydiv">
        <div className="vertice">
          <span>{label}</span>
        </div>
      </div>
    </Drag>
  );
});

export default Vertice;
