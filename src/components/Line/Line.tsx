import React, { useRef, useEffect } from "react";
import { useGraphContainer } from "contexts/graphContainerContext";

type LineProps = {
  div1Ref: React.RefObject<HTMLDivElement> | null;
  div2Ref: React.RefObject<HTMLDivElement> | null;
  isTraversed?: boolean;
};

const Line: React.FC<LineProps> = ({
  div1Ref,
  div2Ref,
  isTraversed = false,
}: LineProps) => {
  const lineRef = useRef<SVGLineElement>(null);
  const { container: containerEl } = useGraphContainer();

  useEffect(() => {
    const handleMouseMove = () => {
      const div1 = div1Ref?.current;
      const div2 = div2Ref?.current;
      const line = lineRef.current;

      if (div1 && div2 && line) {
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
        }
      }
    };

    handleMouseMove();

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [div1Ref, div2Ref]);

  return (
    <line
      ref={lineRef}
      stroke="#4a4a4a"
      className={isTraversed ? "is_traversed" : ""}
      strokeWidth="2"
      style={{
        transition: "stroke 0.3s ease-in-out",
      }}
    />
  );
};

export default Line;
