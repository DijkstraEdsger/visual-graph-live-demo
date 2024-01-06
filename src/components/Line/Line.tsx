import React, { useRef, useEffect } from "react";

type LineProps = {
  div1Ref: React.RefObject<HTMLDivElement> | null;
  div2Ref: React.RefObject<HTMLDivElement> | null;
};

const Line: React.FC<LineProps> = ({ div1Ref, div2Ref }: LineProps) => {
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      const div1 = div1Ref?.current;
      const div2 = div2Ref?.current;
      const line = lineRef.current;

      if (div1 && div2 && line) {
        const rect1 = div1.getBoundingClientRect();
        const rect2 = div2.getBoundingClientRect();

        line.setAttribute("x1", (rect1.left + rect1.right) / 2 + "");
        line.setAttribute("y1", (rect1.top + rect1.bottom) / 2 + "");
        line.setAttribute("x2", (rect2.left + rect2.right) / 2 + "");
        line.setAttribute("y2", (rect2.top + rect2.bottom) / 2 + "");
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return <line ref={lineRef} stroke="black" />;
};

export default Line;
