import React, { useCallback, useMemo, useState } from "react";
import classes from "./classes.module.scss";
import { useAppDispatch } from "./app-context/root/provider";
import { UIActionType } from "./app-context/ui/types";

const GraphContainerContext = React.createContext<{
  container: HTMLDivElement | null;
  edgeConnection?: {
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
  // mousePosition?: {
  //   x: number;
  //   y: number;
  // } | null;
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
  // const [mousePosition, setMousePosition] = useState<{
  //   x: number;
  //   y: number;
  // } | null>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    setContainer(graphContainerRef.current);
  }, []);

  const handleMouseDown = useCallback(
    (verticeRef: React.RefObject<HTMLDivElement>) => {
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
    },
    [graphContainerRef]
  );

  const handleMouseMove = (e: any) => {
    const containerRect = graphContainerRef.current?.getBoundingClientRect();

    // setMousePosition({
    //   x: Math.floor(e.clientX - containerRect!.left),
    //   y: Math.floor(e.clientY - containerRect!.top),
    // });
    dispatch({
      type: UIActionType.UI_SET_MOUSE_POSITION,
      payload: {
        x: Math.floor(e.clientX - containerRect!.left),
        y: Math.floor(e.clientY - containerRect!.top),
      },
    });

    if (isDragging) {
      setLineEnd({
        x: e.clientX - containerRect!.left,
        y: e.clientY - containerRect!.top,
      });
    }
  };

  const handleMouseLeave = (e: any) => {
    // setMousePosition(null);
    dispatch({
      type: UIActionType.UI_SET_MOUSE_POSITION,
      payload: null,
    });
  };

  const handleMouseUp = () => {
    if (isDragging) {
      setIsDragging(false);
      setLineStart({ x: 0, y: 0 });
      setLineEnd({ x: 0, y: 0 });
    }
  };

  const onDoubleClickHandler = (e: React.MouseEvent) => {
    const containerRect = graphContainerRef.current?.getBoundingClientRect();

    setDoubleClickPosition({
      x: e.clientX - containerRect!.left,
      y: e.clientY - containerRect!.top,
    });
  };

  const edgeConnection = useMemo(() => {
    return {
      isDragging,
      lineStart,
      lineEnd,
      handleMouseDown,
    };
  }, [isDragging, lineStart, lineEnd, handleMouseDown]);

  const value = useMemo(() => {
    return {
      container: container,
      edgeConnection,
      doubleClickPosition,
      // mousePosition,
    };
  }, [container, edgeConnection, doubleClickPosition]);

  return (
    <GraphContainerContext.Provider value={value}>
      <div
        ref={graphContainerRef}
        className={classes.graph_container}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onDoubleClick={onDoubleClickHandler}
        title="Double click to add a new vertex"
      >
        {children}
      </div>
    </GraphContainerContext.Provider>
  );
};
