import React, { useRef, useEffect } from "react";

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
  const lineBorderRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      const div1 = div1Ref?.current;
      const div2 = div2Ref?.current;
      const line = lineRef.current;
      const lineBorder = lineBorderRef.current;

      if (div1 && div2 && line) {
        const rect1 = div1.getBoundingClientRect();
        const rect2 = div2.getBoundingClientRect();

        // Main line
        line.setAttribute("x1", (rect1.left + rect1.right) / 2 + "");
        line.setAttribute("y1", (rect1.top + rect1.bottom) / 2 + "");
        line.setAttribute("x2", (rect2.left + rect2.right) / 2 + "");
        line.setAttribute("y2", (rect2.top + rect2.bottom) / 2 + "");

        // Border line
        if (isTraversed) {
          lineBorder?.setAttribute("x1", (rect1.left + rect1.right) / 2 + "");
          lineBorder?.setAttribute("y1", (rect1.top + rect1.bottom) / 2 + "");
          lineBorder?.setAttribute("x2", (rect2.left + rect2.right) / 2 + "");
          lineBorder?.setAttribute("y2", (rect2.top + rect2.bottom) / 2 + "");
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
    <>
      {/* {isTraversed && (
        <line
          ref={lineBorderRef}
          x1="10"
          y1="50"
          x2="190"
          y2="50"
          stroke="#55862e"
          strokeWidth="6"
        />
      )} */}
      <line
        ref={lineRef}
        stroke="black"
        className={isTraversed ? "is_traversed" : ""}
        strokeWidth="2"
      />
    </>
  );
};

export default Line;
