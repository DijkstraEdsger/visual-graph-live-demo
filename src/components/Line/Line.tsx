import React, { useRef, useEffect, useId } from "react";
import { useGraphContainer } from "contexts/graphContainerContext";
import classes from "./classes.module.scss";

const CIRCLE_DIAMETER = 50;

type LineProps = {
  div1Ref: React.RefObject<HTMLDivElement> | null;
  div2Ref: React.RefObject<HTMLDivElement> | null;
  isTraversed?: boolean;
  isDirected?: boolean;
  onRemove?: () => void;
};

const Line: React.FC<LineProps> = ({
  div1Ref,
  div2Ref,
  isTraversed = false,
  isDirected = false,
  onRemove = () => {},
}: LineProps) => {
  const lineRef = useRef<SVGLineElement>(null);
  const borderLineRef = useRef<SVGLineElement>(null);
  const crossRef = useRef<SVGCircleElement>(null);
  const { container: containerEl } = useGraphContainer();
  const arrowHeadId = useId();

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      const div1 = div1Ref?.current;
      const div2 = div2Ref?.current;
      const line = lineRef.current;
      const borderLine = borderLineRef.current;

      if (div1 && line && borderLine) {
        const rect1 = div1.getBoundingClientRect();
        const containerRect = containerEl?.getBoundingClientRect();

        if (containerRect) {
          const x1 = rect1.x + rect1.width / 2 - containerRect.x;
          const y1 = rect1.y + rect1.height / 2 - containerRect.y;
          let x2 = div2
            ? div2.getBoundingClientRect().x +
              div2.getBoundingClientRect().width / 2 -
              containerRect.x
            : event.clientX - containerRect.x;
          let y2 = div2
            ? div2.getBoundingClientRect().y +
              div2.getBoundingClientRect().height / 2 -
              containerRect.y
            : event.clientY - containerRect.y;

          if (div2) {
            const angle = Math.atan2(y2 - y1, x2 - x1);
            x2 = x2 - (CIRCLE_DIAMETER / 2) * Math.cos(angle);
            y2 = y2 - (CIRCLE_DIAMETER / 2) * Math.sin(angle);
          }

          line.setAttribute("x1", x1.toString());
          line.setAttribute("y1", y1.toString());
          line.setAttribute("x2", x2.toString());
          line.setAttribute("y2", y2.toString());

          borderLine.setAttribute("x1", x1.toString());
          borderLine.setAttribute("y1", y1.toString());
          borderLine.setAttribute("x2", x2.toString());
          borderLine.setAttribute("y2", y2.toString());

          // Update the position of the cross
          if (crossRef.current) {
            const midX = (x1 + x2) / 2;
            const midY = (y1 + y2) / 2;
            crossRef.current.style.transform = `translate(${midX - 10}px, ${
              midY - 10
            }px)`;
          }
        }
      }
    };

    handleMouseMove(new MouseEvent("mousemove"));

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [div1Ref, div2Ref, containerEl]);

  const handleMouseEnter = () => {
    if (crossRef.current) {
      crossRef.current.style.opacity = "1";

      const line = lineRef.current;

      if (line) {
        const x1 = parseFloat(line.getAttribute("x1") || "0");
        const y1 = parseFloat(line.getAttribute("y1") || "0");
        const x2 = parseFloat(line.getAttribute("x2") || "0");
        const y2 = parseFloat(line.getAttribute("y2") || "0");

        const midX = (x1 + x2) / 2;
        const midY = (y1 + y2) / 2;

        crossRef.current.style.transform = `translate(${midX - 10}px, ${
          midY - 10
        }px)`;
      }
    }
  };

  const handleMouseLeave = () => {
    if (crossRef.current) {
      crossRef.current.style.opacity = "0";
    }
  };

  return (
    <>
      <line
        ref={borderLineRef}
        stroke="transparent"
        strokeWidth="20"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          cursor: "cell",
        }}
      />
      <defs>
        <marker
          id={arrowHeadId}
          markerWidth="10"
          markerHeight="7"
          refX="10"
          refY="3.5"
          orient="auto"
          strokeWidth={2}
        >
          <polygon
            points="0 0, 10 3.5, 0 7"
            fill={`${isTraversed ? "#32CD32" : "black"}`}
            style={{
              transition: "all 0.3s ease-in-out",
              cursor: "cell",
            }}
          />
        </marker>
      </defs>
      <line
        ref={lineRef}
        stroke="#4a4a4a"
        className={isTraversed ? classes.is_traversed : ""}
        strokeWidth="2"
        markerEnd={isDirected ? `url(#${arrowHeadId})` : undefined}
        style={{
          transition: "all 0.3s ease-in-out",
          cursor: "cell",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      />

      <g
        ref={crossRef}
        style={{
          position: "absolute",
          opacity: 0,
          cursor: "pointer",
        }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={onRemove}
      >
        <circle cx="10" cy="10" r="10" fill="#e74c3c" />
        <line x1="5" y1="5" x2="15" y2="15" stroke="white" strokeWidth="2" />
        <line x1="15" y1="5" x2="5" y2="15" stroke="white" strokeWidth="2" />
      </g>
    </>
  );
};

export default Line;
