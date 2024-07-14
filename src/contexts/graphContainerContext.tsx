import React from "react";

const GraphContainerContext = React.createContext<HTMLDivElement | null>(null);

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

  React.useEffect(() => {
    setContainer(graphContainerRef.current);
  }, []);

  return (
    <GraphContainerContext.Provider value={container}>
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
        }}
      >
        {children}
      </div>
    </GraphContainerContext.Provider>
  );
};
