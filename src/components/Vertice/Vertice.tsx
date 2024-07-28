import React, { forwardRef, useEffect, useId, useRef, useState } from "react";
import "./Vertice.scss";
import Drag from "components/Drag/Drag";
import { InitialPositionType, Position } from "types/graph";
import { ArrowRightIcon } from "@radix-ui/react-icons";

type VerticeProps = {
  label?: string | number;
  isVisited?: boolean;
  initialPosition?: InitialPositionType;
  isAVerticeTryingToConnect?: boolean;
  onMouseDownEdgeHint?: (ref: any) => void;
  onMouseUpEdgeHint?: (label: string | number) => void;
  onChangePosition?: (position: Position) => void;
};

const Vertice = forwardRef<HTMLDivElement, VerticeProps>(
  (
    {
      label,
      isVisited = false,
      initialPosition,
      isAVerticeTryingToConnect = false,
      onMouseDownEdgeHint = () => {},
      onMouseUpEdgeHint = () => {},
      onChangePosition = () => {},
    },
    ref
  ) => {
    const id = useId();
    const hintRef = useRef<HTMLDivElement>(null);
    const [isHintVisible, setIsHintVisible] = useState(false);

    const mouseEnterHandler = (e: MouseEvent) => {
      setIsHintVisible(true);
    };

    const mouseLeaveHandler = (e: MouseEvent) => {
      setIsHintVisible(false);
    };

    const onMouseDownEdgeHintHandler = (e: MouseEvent) => {
      e.stopPropagation();
      onMouseDownEdgeHint(ref);
    };

    useEffect(() => {
      const containerEl = document.getElementById(id);

      if (containerEl) {
        containerEl.addEventListener("mouseenter", mouseEnterHandler);
        containerEl.addEventListener("mouseleave", mouseLeaveHandler);
      }

      if (hintRef) {
        hintRef.current?.addEventListener(
          "mousedown",
          onMouseDownEdgeHintHandler
        );
      }

      return () => {
        containerEl?.removeEventListener("mouseenter", mouseEnterHandler);
        containerEl?.removeEventListener("mouseleave", mouseLeaveHandler);
        hintRef?.current?.removeEventListener(
          "mousedown",
          onMouseDownEdgeHintHandler
        );
      };
    }, []);

    const onMouseUpEdgeHintHandler: React.MouseEventHandler<HTMLDivElement> = (
      e
    ) => {
      if (isAVerticeTryingToConnect) {
        onMouseUpEdgeHint(label || "");
      }
    };

    return (
      <Drag
        ref={ref}
        initialPosition={initialPosition}
        onChangePosition={onChangePosition}
      >
        <div
          id={id}
          className={`vertice ${isAVerticeTryingToConnect ? "connecting" : ""}`}
          style={{
            backgroundColor: isVisited ? "green" : "#00bff",
          }}
          onMouseUp={onMouseUpEdgeHintHandler}
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
