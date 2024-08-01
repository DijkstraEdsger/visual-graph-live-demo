import React, { useRef, useEffect } from "react";
import { useGraphContainer } from "contexts/graphContainerContext";

const CIRCLE_DIAMETER = 20;

type LineProps = {
  div1Ref: React.RefObject<HTMLDivElement> | null;
  div2Ref: React.RefObject<HTMLDivElement> | null;
  isTraversed?: boolean;
  onRemove?: () => void;
};

const Line: React.FC<LineProps> = ({
  div1Ref,
  div2Ref,
  isTraversed = false,
  onRemove = () => {},
}: LineProps) => {
  const lineRef = useRef<SVGLineElement>(null);
  const borderLineRef = useRef<SVGLineElement>(null);
  const crossRef = useRef<SVGCircleElement>(null);
  const { container: containerEl } = useGraphContainer();

  useEffect(() => {
    const handleMouseMove = () => {
      const div1 = div1Ref?.current;
      const div2 = div2Ref?.current;
      const line = lineRef.current;
      const borderLine = borderLineRef.current;

      if (div1 && div2 && line && borderLine) {
        const rect1 = div1.getBoundingClientRect();
        const rect2 = div2.getBoundingClientRect();
        const containerRect = containerEl?.getBoundingClientRect();

        if (containerRect) {
          const x1 = rect1.x + rect1.width / 2 - containerRect.x;
          const y1 = rect1.y + rect1.height / 2 - containerRect.y;
          const x2 = rect2.x + rect2.width / 2 - containerRect.x;
          const y2 = rect2.y + rect2.height / 2 - containerRect.y;

          line.setAttribute("x1", x1.toString());
          line.setAttribute("y1", y1.toString());
          line.setAttribute("x2", x2.toString());
          line.setAttribute("y2", y2.toString());

          borderLine.setAttribute("x1", x1.toString());
          borderLine.setAttribute("y1", y1.toString());
          borderLine.setAttribute("x2", x2.toString());
          borderLine.setAttribute("y2", y2.toString());
        }
      }
    };

    handleMouseMove();

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [div1Ref, div2Ref]);

  const handleMouseEnter = () => {
    if (crossRef.current) {
      crossRef.current.style.opacity = "1";
      const line = lineRef.current;
      if (line) {
        const x1 = parseFloat(line.getAttribute("x1") || "0");
        const y1 = parseFloat(line.getAttribute("y1") || "0");
        const x2 = parseFloat(line.getAttribute("x2") || "0");
        const y2 = parseFloat(line.getAttribute("y2") || "0");

        const x = (x1 + x2) / 2 - CIRCLE_DIAMETER / 2;
        const y = (y1 + y2) / 2 - CIRCLE_DIAMETER / 2;

        crossRef.current.style.transform = `translate(${x}px, ${y}px)`;
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
      <line
        ref={lineRef}
        stroke="#4a4a4a"
        className={isTraversed ? "is_traversed" : ""}
        strokeWidth="2"
        style={{
          transition: "stroke 0.3s ease-in-out",
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
        <circle cx="10" cy="10" r="10" fill="red" />
        <line x1="5" y1="5" x2="15" y2="15" stroke="white" strokeWidth="2" />
        <line x1="15" y1="5" x2="5" y2="15" stroke="white" strokeWidth="2" />
      </g>
    </>
  );
};

export default Line;
