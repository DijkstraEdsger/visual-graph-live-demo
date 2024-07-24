import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import "./Vertice.scss";
import Drag from "components/Drag/Drag";
import { InitialPositionType } from "types/graph";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type VerticeProps = {
  label?: string | number;
  isVisited?: boolean;
  initialPosition?: InitialPositionType;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(
  ({ label, isVisited = false, initialPosition }, ref) => {
    const id = useId();
    const hintRef = useRef<HTMLDivElement>(null);
    const [isHintVisible, setIsHintVisible] = useState(false);

    const mouseEnterHandler = (e: MouseEvent) => {
      setIsHintVisible(true);
    };

    const mouseLeaveHandler = (e: MouseEvent) => {
      setIsHintVisible(false);
    };

    useEffect(() => {
      const containerEl = document.getElementById(id);

      if (containerEl) {
        containerEl.addEventListener("mouseenter", mouseEnterHandler);
        containerEl.addEventListener("mouseleave", mouseLeaveHandler);
      }

      return () => {
        containerEl?.removeEventListener("mouseenter", mouseEnterHandler);
        containerEl?.removeEventListener("mouseleave", mouseLeaveHandler);
      };
    }, []);

    return (
      <Drag ref={ref} initialPosition={initialPosition}>
        <div
          id={id}
          className="vertice"
          style={{
            backgroundColor: isVisited ? "green" : "#00bff",
          }}
        >
          <span>{label}</span>
          <div
            ref={hintRef}
            className="hint_edge"
            style={{
              visibility: isHintVisible ? "visible" : "hidden",
            }}
          >
            <ArrowRightIcon stroke="#fff" />
          </div>
        </div>
      </Drag>
    );
  }
);

export default Vertice;
