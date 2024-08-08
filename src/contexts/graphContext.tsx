import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useRef,
  useState,
} from "react";
import { Edge, Position, VerticeType } from "types/graph";

const initialVertices = [1, 2, 3];
const initialEdges: Edge[] = [
  [1, 2],
  [2, 3],
  [3, 1],
];
const initialTraversalPath: VerticeType[] = [1, 2, 3, 4];
const initialPositions = {
  1: { left: 100, top: 100 },
  2: { left: 300, top: 100 },
  3: { left: 200, top: 300 },
};

const GraphContext = createContext<{
  vertices: VerticeType[];
  edges: Edge[];
  traversalPath: VerticeType[];
  positions: { [key: string]: { left: number; top: number } };
  inputFileRef: RefObject<HTMLInputElement>;
  addVerticeHandler: (vertice: VerticeType, position: Position) => void;
  addEdgeHandler: (edge: Edge) => void;
  downloadGraphAsTxt: () => void;
  uploadGraph: () => void;
  updatePositions: (vertice: VerticeType, position: Position) => void;
  removeEdge?: (edge: Edge) => void;
  removeVertice?: (vertice: VerticeType) => void;
}>({
  vertices: [],
  edges: [],
  traversalPath: [],
  positions: {},
  inputFileRef: { current: null },
  addVerticeHandler: () => {},
  addEdgeHandler: () => {},
  downloadGraphAsTxt: () => {},
  uploadGraph: () => {},
  updatePositions: () => {},
  removeEdge: () => {},
  removeVertice: () => {},
});

type GraphProviderProps = {
  children: ReactNode;
};

const GraphProvider: FC<GraphProviderProps> = ({
  children,
}: GraphProviderProps) => {
  const [vertices, setVertices] = useState<VerticeType[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [traversalPath, setWayPoints] = useState<VerticeType[]>([]);
  const [positions, setPositions] = useState<{
    [key: string]: { left: number; top: number };
  }>({});
  const inputFileRef = useRef<HTMLInputElement>(null);

  const addEdgeHandler = (edge: Edge) => {
    setEdges([...edges, edge]);
  };

  const addVerticeHandler = (
    vertice: VerticeType,
    position: {
      x: number;
      y: number;
    }
  ) => {
    setVertices([...vertices, vertice]);
    setPositions({
      ...positions,
      [vertice]: { left: position.x, top: position.y },
    });
  };

  const updatePositions = (vertice: VerticeType, position: Position) => {
    setPositions((prevP) => ({
      ...prevP,
      [vertice]: {
        left: position.x,
        top: position.y,
      },
    }));
  };

  const downloadGraphAsTxt = () => {
    // the txt file will contain the vertices, edges and positions of the vertices
    // the format will be like a JSON object

    const data = {
      vertices,
      edges,
      positions,
    };

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "graph.txt";
    a.click();
  };

  const uploadGraph = () => {
    const file = inputFileRef.current?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const data = JSON.parse(result);
        setVertices(data.vertices);
        setEdges(data.edges);
        setPositions(data.positions);
      };
      reader.readAsText(file);
    }

    inputFileRef.current!.value = "";
  };

  const removeEdge = (edge: Edge) => {
    const indexEdge = edges.findIndex(
      (e) =>
        (e[0] === edge[0] && e[1] === edge[1]) ||
        (e[0] === edge[1] && e[1] === edge[0])
    );

    if (indexEdge !== -1) {
      const newEdges = [...edges];
      newEdges.splice(indexEdge, 1);
      setEdges(newEdges);
    }
  };

  const removeVertice = (vertice: VerticeType) => {
    const newVertices = vertices.filter((v) => v !== vertice);
    setVertices(newVertices);

    const newEdges = edges.filter((edge) => !edge.includes(vertice));
    setEdges(newEdges);

    const newPositions = { ...positions };
    delete newPositions[vertice];
    setPositions(newPositions);

    const newTraversalPath = traversalPath.filter((v) => v !== vertice);
    setWayPoints(newTraversalPath);
  };

  return (
    <GraphContext.Provider
      value={{
        vertices,
        edges,
        traversalPath,
        positions,
        inputFileRef,
        addVerticeHandler,
        addEdgeHandler,
        downloadGraphAsTxt,
        uploadGraph,
        updatePositions,
        removeEdge,
        removeVertice,
      }}
    >
      {children}
      <input
        ref={inputFileRef}
        type="file"
        id="graphFile"
        onChange={uploadGraph}
        title="Upload Graph"
        style={{
          visibility: "hidden",
          position: "absolute",
        }}
      />
    </GraphContext.Provider>
  );
};

const useGraph = () => {
  const context = useContext(GraphContext);

  if (!context) {
    throw new Error("useGraph must be used within a GraphProvider");
  }

  return context;
};

export { GraphProvider, useGraph };
