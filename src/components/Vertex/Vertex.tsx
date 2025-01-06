import React, {
  forwardRef,
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
} from "react";
import classes from "./classes.module.scss";
import Drag from "components/Drag/Drag";
import { InitialPositionType, Position } from "types/graph";
import { ArrowRightIcon, Cross2Icon } from "@radix-ui/react-icons";

type VertexProps = {
  label?: string | number;
  isVisited?: boolean;
  initialPosition?: InitialPositionType;
  isAVertexTryingToConnect?: boolean;
  onMouseDownEdgeHint?: (ref: any) => void;
  onMouseUpEdgeHint?: (label: string | number) => void;
  onChangePosition?: (position: Position) => void;
  onRemove?: () => void;
};

const Vertex = forwardRef<HTMLDivElement, VertexProps>(
  (
    {
      label,
      isVisited = false,
      initialPosition,
      isAVertexTryingToConnect = false,
      onMouseDownEdgeHint = () => {},
      onMouseUpEdgeHint = () => {},
      onChangePosition = () => {},
      onRemove = () => {},
    },
    ref
  ) => {
    const id = useId();
    const hintRef = useRef<HTMLDivElement>(null);
    const removeRef = useRef<HTMLDivElement>(null);
    const [isHintVisible, setIsHintVisible] = useState(false);

    const mouseEnterHandler = (e: MouseEvent) => {
      setIsHintVisible(true);
    };

    const touchStartHandler = (e: TouchEvent) => {
      setIsHintVisible(true);
    };

    const mouseLeaveHandler = (e: MouseEvent) => {
      setIsHintVisible(false);
    };

    const touchEndHandler = (e: TouchEvent) => {
      setIsHintVisible(false);
    };

    const onMouseDownEdgeHintHandler = useCallback(
      (e: MouseEvent) => {
        e.stopPropagation();

        onMouseDownEdgeHint(ref);
      },
      [onMouseDownEdgeHint, ref]
    );

    const onTouchStartEdgeHintHandler = useCallback(
      (e: TouchEvent) => {
        e.stopPropagation();

        onMouseDownEdgeHint(ref);
      },
      [onMouseDownEdgeHint, ref]
    );

    useEffect(() => {
      const containerEl = document.getElementById(id);

      if (containerEl) {
        containerEl.addEventListener("mouseenter", mouseEnterHandler);
        containerEl.addEventListener("mouseleave", mouseLeaveHandler);
        containerEl.addEventListener("touchstart", touchStartHandler);
        // containerEl.addEventListener("touchend", touchEndHandler);
      }

      if (hintRef) {
        hintRef.current?.addEventListener(
          "mousedown",
          onMouseDownEdgeHintHandler
        );
        hintRef.current?.addEventListener(
          "touchstart",
          onTouchStartEdgeHintHandler
        );
      }

      return () => {
        containerEl?.removeEventListener("mouseenter", mouseEnterHandler);
        containerEl?.removeEventListener("mouseleave", mouseLeaveHandler);
        hintRef?.current?.removeEventListener(
          "mousedown",
          onMouseDownEdgeHintHandler
        );
        hintRef?.current?.removeEventListener(
          "touchstart",
          onTouchStartEdgeHintHandler
        );
      };
    }, [
      ref,
      hintRef,
      id,
      onMouseDownEdgeHintHandler,
      onTouchStartEdgeHintHandler,
    ]);

    const onMouseUpEdgeHintHandler: React.MouseEventHandler<HTMLDivElement> = (
      e
    ) => {
      if (isAVertexTryingToConnect) {
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
          className={`${classes.vertex} ${
            isAVertexTryingToConnect ? classes.connecting : ""
          } ${isVisited ? classes["vertex--visited"] : ""}`}
          onMouseUp={onMouseUpEdgeHintHandler}
        >
          <span>{label}</span>
          <div
            ref={hintRef}
            className={classes["hint-edge"]}
            style={{
              visibility: isHintVisible ? "visible" : "hidden",
            }}
          >
            <ArrowRightIcon stroke="#fff" />
          </div>
          <div
            ref={removeRef}
            className={classes["remove-vertex"]}
            style={{
              visibility: isHintVisible ? "visible" : "hidden",
            }}
            onClick={onRemove}
          >
            <Cross2Icon />
          </div>
        </div>
      </Drag>
    );
  }
);

export default Vertex;
