import React, { useRef, useEffect } from "react";

type LineProps = {
  children?: React.ReactNode;
};

const Line: React.FC<LineProps> = ({ children }: LineProps) => {
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGLineElement>(null);

  useEffect(() => {
    const handleMouseMove = () => {
      const div1 = div1Ref.current;
      const div2 = div2Ref.current;
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

  const firstChildren = React.Children.toArray(children)[0];
  const secondChildren = React.Children.toArray(children)[1];
  const updatedFirstChildren = React.cloneElement(
    firstChildren as React.ReactElement,
    {
      ref: div1Ref,
    }
  );
  const updatedSecondChildren = React.cloneElement(
    secondChildren as React.ReactElement,
    {
      ref: div2Ref,
    }
  );

  return (
    <>
      <svg
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
        }}
      >
        <line ref={lineRef} stroke="black" />
      </svg>
      {updatedFirstChildren}
      {updatedSecondChildren}
    </>
  );
};

export default Line;
