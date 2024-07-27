import React, { useState } from "react";

const GraphContainerContext = React.createContext<{
  container: HTMLDivElement | null;
  edgeConection?: {
    lineStart: {
      x: number;
      y: number;
    };
    lineEnd: {
      x: number;
      y: number;
    };
    handleMouseDown: (verticeRef: React.RefObject<HTMLDivElement>) => void;
  };
}>({
  container: null,
});

export const useGraphContainer = () => {
  const graphContainer = React.useContext(GraphContainerContext);

  //   if (!graphContainer) {
  //     throw new Error("useGraphContainer must be used within a GraphContainer");
  //   }

  return graphContainer;
};

export const GraphContainer: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const graphContainerRef = React.useRef<HTMLDivElement>(null);
  const [container, setContainer] = React.useState<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [lineStart, setLineStart] = useState({ x: 0, y: 0 });
  const [lineEnd, setLineEnd] = useState({ x: 0, y: 0 });

  React.useEffect(() => {
    setContainer(graphContainerRef.current);
  }, []);

  const handleMouseDown = (verticeRef: React.RefObject<HTMLDivElement>) => {
    setIsDragging(true);
    const rect = verticeRef.current?.getBoundingClientRect() as DOMRect;
    const containerRect = graphContainerRef.current?.getBoundingClientRect();

    const x = rect.left + rect.width / 2 - containerRect?.left!;
    const y = rect.top + rect.height / 2 - containerRect?.top!;

    setLineStart({
      x,
      y,
    });
    setLineEnd({
      x,
      y,
    });
  };

  const handleMouseMove = (e: any) => {
    if (!isDragging) return;
    const containerRect = graphContainerRef.current?.getBoundingClientRect();

    setLineEnd({
      x: e.clientX - containerRect!.left,
      y: e.clientY - containerRect!.top,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setLineStart({ x: 0, y: 0 });
    setLineEnd({ x: 0, y: 0 });
  };

  return (
    <GraphContainerContext.Provider
      value={{
        container: container,
        edgeConection: {
          lineStart,
          lineEnd,
          handleMouseDown,
        },
      }}
    >
      <div
        ref={graphContainerRef}
        style={{
          width: "70vw",
          height: "70vh",
          position: "relative",
          margin: "0 auto",
          border: "1px solid black",
          overflow: "hidden",
          zIndex: 1,
          userSelect: "none",
        }}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        {children}
      </div>
    </GraphContainerContext.Provider>
  );
};
