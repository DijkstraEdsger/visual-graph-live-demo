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
  useReducer,
  useRef,
  useState,
} from "react";
import {
  IEdge,
  IGraphFile,
  INode,
  IShortestPath,
  NodeId,
  Position,
} from "types/graph";
import { useGraphDocumentDispatch } from "./graph-document-context";
import { useAppDispatch } from "./app-context/root/provider";
import { AlgorithmActionType } from "./app-context/algorithm/types";
import { toast } from "react-toastify";

type TimeStampHistoryItem = {
  graph: GraphState;
};

type Undo = TimeStampHistoryItem[];

type Redo = TimeStampHistoryItem[];

type HistoryStack = {
  undo: Undo;
  redo: Redo;
};

type GraphState = {
  vertices: INode[];
  edges: IEdge[];
  isDirected?: boolean;
};

const initialState: GraphState = {
  vertices: [],
  edges: [],
  isDirected: false,
};

enum ActionType {
  ADD_VERTICE = "vertice/add",
  DELETE_VERTICE = "vertice/delete",
  UPDATE_VERTICE_POSITION = "vertice/updatePosition",
  ADD_EDGE = "edge/add",
  DELETE_EDGE = "edge/delete",
  UPDATE_IS_DIRECTED = "isDirected/update",
  SET_STATE = "state/set",
  CLEAN_STATE = "state/clean",
}

type UpdatePositionType = {
  verticeId: NodeId;
  position: Position;
};

type ActionPayload =
  | INode
  | IEdge
  | boolean
  | NodeId
  | UpdatePositionType
  | GraphState;

type Action = {
  type: ActionType;
  payload?: ActionPayload;
};

const reducer: React.Reducer<GraphState, Action> = (
  state,
  action
): GraphState => {
  switch (action.type) {
    case ActionType.ADD_VERTICE:
      const newVertice = action.payload as INode;

      return {
        ...state,
        vertices: [...structuredClone(state.vertices), newVertice],
      };

    case ActionType.DELETE_VERTICE:
      const verticeId = action.payload as NodeId;
      const filteredVertices = structuredClone(state.vertices).filter(
        (vertice: INode) => vertice.id !== verticeId
      );

      const filteredEdges = structuredClone(state.edges).filter(
        (e: IEdge) => e.source !== verticeId && e.target !== verticeId
      );

      return {
        ...state,
        vertices: [...filteredVertices],
        edges: [...filteredEdges],
      };
    case ActionType.UPDATE_VERTICE_POSITION:
      const { verticeId: id, position }: UpdatePositionType =
        action.payload as UpdatePositionType;

      const verticesCopy = [...structuredClone(state.vertices)];

      const findVerticeIndex = verticesCopy.findIndex(
        (v: INode) => v.id === id
      );

      if (findVerticeIndex !== -1) {
        verticesCopy[findVerticeIndex].position = {
          left: position.x,
          top: position.y,
        };
      }

      return {
        ...state,
        vertices: [...verticesCopy],
      };
    case ActionType.ADD_EDGE:
      const newEdge: IEdge = action.payload as IEdge;

      return {
        ...state,
        edges: [...structuredClone(state.edges), newEdge],
      };
    case ActionType.DELETE_EDGE:
      const edge: IEdge = action.payload as IEdge;

      const indexEdge = state.edges.findIndex(
        (e) =>
          (e.source === edge.source && e.target === edge.target) ||
          (e.source === edge.target && e.target === edge.source)
      );

      const edgesCopy = [...structuredClone(state.edges)];

      if (indexEdge !== -1) {
        edgesCopy.splice(indexEdge, 1);
      }

      return {
        ...state,
        edges: [...edgesCopy],
      };
    case ActionType.UPDATE_IS_DIRECTED:
      return {
        ...state,
        isDirected: action.payload as boolean,
      };
    case ActionType.SET_STATE:
      const newState: GraphState = action.payload as GraphState;

      return {
        ...newState,
      };
    case ActionType.CLEAN_STATE:
      return {
        edges: [],
        vertices: [],
        isDirected: false,
      };
  }
};

const GraphContext = createContext<{
  graph: GraphState;
  vertices: INode[];
  edges: IEdge[];
  traversalPath: NodeId[];
  highlightedEdges?: IEdge[];
  highlightedVertices?: NodeId[];
  inputFileRef: RefObject<HTMLInputElement>;
  algorithms?: {
    dijkstra: (source: NodeId, target: NodeId) => void;
    bellmanFord: (source: NodeId, target: NodeId) => void;
    prim: () => any;
    dfs: (startNode: NodeId) => any;
  };
  activeAlgorithm?: string | null;
  isDirected?: boolean;
  isComplete?: boolean;
  isBipartite?: boolean;
  dfsTraversal?: IEdge[];
  selectedVertice?: NodeId | null;
  setIsDirectedHandler: (isDirected: boolean) => void;
  addVerticeHandler: (vertice: INode) => void;
  addEdgeHandler: (edge: IEdge) => void;
  downloadGraphAsTxt: () => void;
  uploadGraph: () => void;
  updatePositions: (vertice: INode, position: Position) => void;
  removeEdge?: (edge: IEdge) => void;
  removeVertice?: (vertice: INode) => void;
  setActiveAlgorithmHandler?: (algorithm: string) => void;
  cleanPath?: () => void;
  cleanHighlighted?: () => void;
  cleanDfsResult?: () => void;
  undo?: () => void;
  redo?: () => void;
  openGraph?: (data: GraphState) => void;
  cleanGraph?: () => void;
  selectVerticeHandler?: (verticeId: NodeId) => void;
}>({
  graph: {
    vertices: [],
    edges: [],
    isDirected: false,
  },
  vertices: [],
  edges: [],
  traversalPath: [],
  inputFileRef: { current: null },
  isDirected: false,
  selectedVertice: null,
  setIsDirectedHandler: () => {},
  addVerticeHandler: () => {},
  addEdgeHandler: () => {},
  downloadGraphAsTxt: () => {},
  uploadGraph: () => {},
  updatePositions: () => {},
  removeEdge: () => {},
  removeVertice: () => {},
  undo: () => {},
  redo: () => {},
});

type GraphProviderProps = {
  children: ReactNode;
};

const GraphProvider: FC<GraphProviderProps> = ({
  children,
}: GraphProviderProps) => {
  const [traversalPath, setWayPoints] = useState<NodeId[]>([]);
  const [highlightedEdges, setHighlightedEdges] = useState<IEdge[]>([]);
  const [highlightedVertices, setHighlightedVertices] = useState<NodeId[]>([]);
  const [dfsTraversal, setDfsTraversal] = useState<IEdge[]>([]);
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [selectedVertice, setSelectedVertice] = useState<NodeId | null>(null);
  const [isBipartite, setIsBipartite] = useState<boolean>(false);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [graphAdapter, setGraphAdapter] = useState<IGraphAdapter | null>(null);
  const [shortestPaths, setShortestPaths] = useState<
    Record<NodeId, IShortestPath>
  >({});
  const [activeAlgorithm, setActiveAlgorithm] = useState<string | null>(null);
  const historyStack = useRef<HistoryStack>({
    undo: [],
    redo: [],
  });
  const [state, dispatch] = useReducer(reducer, initialState);
  const documentDispatch = useGraphDocumentDispatch();
  const appDispatch = useAppDispatch();
  // const { isDocumentModified } = useGraphDocumentState();
  // const appDispatch = useAppDispatch();

  const updateHistoryStack = ({
    prevVertices,
    prevEdges,
    prevIsDirected,
  }: {
    prevVertices?: INode[];
    prevEdges?: IEdge[];
    prevIsDirected?: boolean;
  }) => {
    const undoLength = historyStack.current.undo.length;

    historyStack.current.undo.push({
      graph: {
        vertices: prevVertices
          ? [...prevVertices]
          : historyStack.current.undo[undoLength - 1]?.graph?.vertices ?? [],
        edges: prevEdges
          ? [...prevEdges]
          : historyStack.current.undo[undoLength - 1]?.graph?.edges ?? [],
        isDirected:
          prevIsDirected !== undefined
            ? prevIsDirected
            : !!historyStack.current.undo[undoLength - 1]?.graph?.isDirected,
      },
    });

    historyStack.current.redo = [];
  };

  const undo = () => {
    if (historyStack.current.undo.length > 0) {
      const previousState = historyStack.current.undo.pop();

      historyStack.current.redo.push({
        graph: {
          vertices: [...structuredClone(state.vertices)],
          edges: [...structuredClone(state.edges)],
          isDirected: state.isDirected,
        },
      });

      const newState: GraphState = structuredClone(
        previousState?.graph
      ) as GraphState;

      dispatch({ type: ActionType.SET_STATE, payload: newState });
    }
  };

  const redo = () => {
    if (historyStack.current.redo.length > 0) {
      const nextState = historyStack.current.redo.pop();

      historyStack.current.undo.push({
        graph: {
          vertices: [...structuredClone(state.vertices)],
          edges: [...structuredClone(state.edges)],
          isDirected: state.isDirected,
        },
      });

      const newState: GraphState = structuredClone(
        nextState?.graph
      ) as GraphState;

      dispatch({ type: ActionType.SET_STATE, payload: newState });
    }
  };

  const adapter = useMemo(() => {
    const { vertices, edges, isDirected } = state;
    return new GraphlibAdapter(isDirected, vertices, edges);
  }, [state.isDirected]);

  const setIsDirectedHandler = (isDirected: boolean) => {
    dispatch({ type: ActionType.UPDATE_IS_DIRECTED, payload: isDirected });
    documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: true });
  };

  const addEdgeHandler = (edge: IEdge) => {
    dispatch({ type: ActionType.ADD_EDGE, payload: edge });
    documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: true });
    adapter.addEdge(edge);
  };

  const addVerticeHandler = (vertice: INode) => {
    dispatch({ type: ActionType.ADD_VERTICE, payload: vertice });
    documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: true });

    adapter.addNode(vertice);
  };

  useEffect(() => {
    const undoSize = historyStack.current.undo.length;

    return () => {
      // Undo tracking begin

      if (undoSize === historyStack.current.undo.length) {
        updateHistoryStack({
          prevVertices: [...state.vertices],
          prevEdges: [...state.edges],
          prevIsDirected: state.isDirected,
        });
      }

      // Undo tracking end
    };
  }, [state]);

  useEffect(() => {
    setIsComplete(adapter.isCompleteGraph(state.vertices, state.edges));
    // setIsBipartite(adapter.)
  }, [state.vertices.length, state.edges.length]);

  const updatePositions = (vertice: INode, position: Position) => {
    dispatch({
      type: ActionType.UPDATE_VERTICE_POSITION,
      payload: {
        verticeId: vertice.id,
        position,
      },
    });
    documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: true });
  };

  const downloadGraphAsTxt = () => {
    // the txt file will contain the vertices, edges and positions of the vertices
    // the format will be like a JSON object

    const data = {
      ...state,
    };

    const a = document.createElement("a");
    const file = new Blob([JSON.stringify(data)], { type: "text/plain" });
    a.href = URL.createObjectURL(file);
    a.download = "graph.txt";
    a.click();
  };

  const createGraphFromData = (data: IGraphFile) => {
    const { vertices, edges, isDirected } = data;
    adapter.createGraph(isDirected, vertices, edges);
  };

  const uploadGraph = () => {
    const file = inputFileRef.current?.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        const data: IGraphFile = JSON.parse(result);
        const newState: GraphState = {
          vertices: data.vertices,
          edges: data.edges,
          isDirected: data.isDirected,
        };
        dispatch({ type: ActionType.SET_STATE, payload: newState });
        documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: true });
        createGraphFromData(data);
      };
      reader.readAsText(file);
    }

    inputFileRef.current!.value = "";
  };

  const openGraph = (data: GraphState) => {
    const newState: GraphState = {
      vertices: data.vertices,
      edges: data.edges,
      isDirected: data.isDirected,
    };
    dispatch({ type: ActionType.SET_STATE, payload: newState });
    createGraphFromData(data);
  };

  const removeEdge = (edge: IEdge) => {
    dispatch({ type: ActionType.DELETE_EDGE, payload: edge });
    documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: true });
    adapter.removeEdge(edge);
  };

  const removeVertice = (vertice: INode) => {
    adapter.removeNode(vertice.id);

    dispatch({ type: ActionType.DELETE_VERTICE, payload: vertice.id });
    documentDispatch({ type: "SET_IS_DOCUMENT_MODIFIED", payload: true });

    const newTraversalPath = traversalPath.filter((v) => v !== vertice.id);
    setWayPoints(newTraversalPath);
  };

  const runDijkstraHandler = (source: NodeId, target: NodeId) => {
    appDispatch({
      type: AlgorithmActionType.SET_IS_ALGORITHM_RUNNING,
      payload: true,
    });
    const paths = adapter.runDijkstra(source);
    appDispatch({
      type: AlgorithmActionType.SET_IS_ALGORITHM_RUNNING,
      payload: false,
    });
    setShortestPaths(paths);
    let path: NodeId[] = [];

    try {
      path = adapter.buildPath(paths, source.toString(), target.toString());
    } catch (error) {
      toast.error((error as Error).message, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }

    setWayPoints(path);
  };

  const runPrimHandler = () => {
    const { nodes, edges } = adapter.runPrim();
    setHighlightedEdges(edges);
    setHighlightedVertices(nodes);
  };

  const runDfsHandler = (startNode: NodeId) => {
    appDispatch({
      type: AlgorithmActionType.SET_IS_ALGORITHM_RUNNING,
      payload: true,
    });
    const { edges } = adapter.dfs({
      vertices: state.vertices,
      edges: state.edges,
      startVertex: startNode,
      isDirected: state.isDirected ?? false,
    });
    appDispatch({
      type: AlgorithmActionType.SET_IS_ALGORITHM_RUNNING,
      payload: false,
    });
    setDfsTraversal(edges);
  };

  const runBellmanFordHandler = (source: NodeId, target: NodeId) => {
    const paths = adapter.runBellmanFord(source);
    setShortestPaths(paths);
    const path = adapter.buildPath(paths, source.toString(), target.toString());
    setWayPoints(path);
  };

  const setActiveAlgorithmHandler = (algorithm: string) => {
    setActiveAlgorithm(algorithm);
    appDispatch({
      type: AlgorithmActionType.SET_SELECTED_ALGORITHM,
      payload: algorithm,
    });
  };

  const cleanPath = () => {
    setWayPoints([]);
  };

  const cleanHighlighted = () => {
    setHighlightedEdges([]);
    setHighlightedVertices([]);
  };

  const cleanDfsResult = () => {
    setDfsTraversal([]);
  };

  const cleanGraphHandler = () => {
    dispatch({ type: ActionType.CLEAN_STATE });
    // if (isDocumentModified) {
    //   appDispatch({ type: UIActionType.UI_OPEN_WANT_TO_SAVE_MODAL });
    // } else {
    //   dispatch({ type: ActionType.CLEAN_STATE });
    // }
  };

  const selectVerticeHandler = (verticeId: NodeId) => {
    setSelectedVertice(verticeId);
  };

  return (
    <GraphContext.Provider
      value={{
        graph: state,
        vertices: state.vertices,
        edges: state.edges,
        traversalPath,
        highlightedEdges,
        highlightedVertices,
        inputFileRef,
        activeAlgorithm,
        algorithms: {
          dijkstra: runDijkstraHandler,
          bellmanFord: runBellmanFordHandler,
          prim: runPrimHandler,
          dfs: runDfsHandler,
        },
        isDirected: state.isDirected,
        isComplete,
        dfsTraversal,
        selectedVertice,
        setIsDirectedHandler,
        addVerticeHandler,
        addEdgeHandler,
        downloadGraphAsTxt,
        uploadGraph,
        updatePositions,
        removeEdge,
        removeVertice,
        setActiveAlgorithmHandler,
        cleanPath,
        cleanHighlighted,
        cleanDfsResult,
        undo,
        redo,
        openGraph,
        cleanGraph: cleanGraphHandler,
        selectVerticeHandler,
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
