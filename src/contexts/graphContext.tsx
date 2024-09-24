import GraphlibAdapter from "adapters/GraphlibAdapter";
import { IGraphAdapter } from "interfaces/IGraphAdapter";
import {
  createContext,
  FC,
  ReactNode,
  RefObject,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { IEdge, INode, IShortestPath, NodeId, Position } from "types/graph";

const initialVertices: INode[] = [
  { id: "1", label: "1" },
  { id: "2", label: "2" },
  { id: "3", label: "3" },
];
const initialEdges: IEdge[] = [
  { source: "1", target: "2", weight: 1 },
  { source: "1", target: "3", weight: 1 },
  { source: "2", target: "3", weight: 1 },
];
const initialTraversalPath: NodeId[] = [1, 2, 3, 4];
const initialPositions = {
  1: { left: 100, top: 100 },
  2: { left: 300, top: 100 },
  3: { left: 200, top: 300 },
};

const GraphContext = createContext<{
  vertices: INode[];
  edges: IEdge[];
  traversalPath: NodeId[];
  positions: { [key: string]: { left: number; top: number } };
  inputFileRef: RefObject<HTMLInputElement>;
  addVerticeHandler: (vertice: INode, position: Position) => void;
  addEdgeHandler: (edge: IEdge) => void;
  downloadGraphAsTxt: () => void;
  uploadGraph: () => void;
  updatePositions: (vertice: INode, position: Position) => void;
  removeEdge?: (edge: IEdge) => void;
  removeVertice?: (vertice: INode) => void;
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
  const [vertices, setVertices] = useState<INode[]>([]);
  const [edges, setEdges] = useState<IEdge[]>([]);
  const [traversalPath, setWayPoints] = useState<NodeId[]>([]);
  const [positions, setPositions] = useState<{
    [key: string]: { left: number; top: number };
  }>({});
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [graphAdapter, setGraphAdapter] = useState<IGraphAdapter | null>(null);
  const [shortestPaths, setShortestPaths] = useState<
    Record<NodeId, IShortestPath>
  >({});

  const adapter = useMemo(() => {
    return new GraphlibAdapter();
  }, []);

  useEffect(() => {
    // const adapter = new GraphlibAdapter(); // or new GraphologyAdapter()
    adapter.createGraph();

    // adapter.addNode({ id: "A", label: "A" });
    // adapter.addNode({ id: "B", label: "B" });
    // adapter.addNode({ id: "C", label: "C" });
    // adapter.addNode({ id: "D", label: "D" });

    // adapter.addEdge({ source: "A", target: "B", weight: 1 });
    // adapter.addEdge({ source: "A", target: "C", weight: 4 });
    // adapter.addEdge({ source: "B", target: "D", weight: 5 });
    // adapter.addEdge({ source: "C", target: "D", weight: 1 });
    // adapter.addEdge({ source: "B", target: "C", weight: 2 });

    // setGraphAdapter(adapter);

    // const paths = adapter.runDijkstra("A");
    // setShortestPaths(paths);
  }, [adapter]);

  const addEdgeHandler = (edge: IEdge) => {
    setEdges([...edges, edge]);
    adapter.addEdge(edge);
  };

  const addVerticeHandler = (
    vertice: INode,
    position: {
      x: number;
      y: number;
    }
  ) => {
    setVertices([...vertices, vertice]);
    setPositions({
      ...positions,
      [vertice.id]: { left: position.x, top: position.y },
    });
    adapter.addNode(vertice);
  };

  const updatePositions = (vertice: INode, position: Position) => {
    setPositions((prevP) => ({
      ...prevP,
      [vertice.id]: {
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

  const removeEdge = (edge: IEdge) => {
    const indexEdge = edges.findIndex(
      (e) =>
        (e.source === edge.source && e.target === edge.target) ||
        (e.source === edge.target && e.target === edge.source)
    );

    if (indexEdge !== -1) {
      const newEdges = [...edges];
      newEdges.splice(indexEdge, 1);
      setEdges(newEdges);
      adapter.removeEdge(edge);
    }
  };

  const removeVertice = (vertice: INode) => {
    const newVertices = vertices.filter((v) => v.id !== vertice.id);
    setVertices(newVertices);
    adapter.removeNode(vertice.id);

    const newEdges = edges.filter(
      (e) => e.source !== vertice.id && e.target !== vertice.id
    );
    setEdges(newEdges);

    const newPositions = { ...positions };
    delete newPositions[vertice.id];
    setPositions(newPositions);

    const newTraversalPath = traversalPath.filter((v) => v !== vertice.id);
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
