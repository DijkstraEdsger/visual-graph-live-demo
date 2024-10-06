import React, { useState } from "react";
import classes from "./classes.module.scss";

const GraphContainerContext = React.createContext<{
  container: HTMLDivElement | null;
  edgeConection?: {
    isDragging: boolean;
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
  doubleClickPosition?: {
    x: number;
    y: number;
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
  const [doubleClickPosition, setDoubleClickPosition] = useState<{
    x: number;
    y: number;
  }>({ x: 0, y: 0 });

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

  const onDoubleClickHandler = (e: React.MouseEvent) => {
    const containerRect = graphContainerRef.current?.getBoundingClientRect();

    setDoubleClickPosition({
      x: e.clientX - containerRect!.left,
      y: e.clientY - containerRect!.top,
    });
  };

  return (
    <GraphContainerContext.Provider
      value={{
        container: container,
        edgeConection: {
          isDragging,
          lineStart,
          lineEnd,
          handleMouseDown,
        },
        doubleClickPosition,
      }}
    >
      <div
        ref={graphContainerRef}
        className={classes.graph_container}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onDoubleClick={onDoubleClickHandler}
        title="Double click to add a new vertice"
      >
        {children}
      </div>
    </GraphContainerContext.Provider>
  );
};
