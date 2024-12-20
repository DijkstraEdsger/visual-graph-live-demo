import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { IEdge, INode } from "types/graph";

interface Graph {
  name: string;
  data: {
    vertices: INode[];
    edges: IEdge[];
    isDirected?: boolean;
  };
}

interface GraphState {
  graphs: Graph[];
}

interface AddGraphAction {
  type: "ADD_GRAPH";
  payload: Graph;
}

interface DeleteGraphAction {
  type: "DELETE_GRAPH";
  payload: string;
}

interface RenameGraphAction {
  type: "RENAME_GRAPH";
  payload: { oldName: string; newName: string };
}

interface SetGraphsAction {
  type: "SET_GRAPHS";
  payload: Graph[];
}

type GraphAction =
  | AddGraphAction
  | DeleteGraphAction
  | RenameGraphAction
  | SetGraphsAction;

const initialState: GraphState = {
  graphs: [],
};

const GraphDocumentContext = createContext<{
  state: GraphState;
  dispatch: React.Dispatch<GraphAction>;
}>({
  state: initialState,
  dispatch: () => undefined,
});

const graphDocumentReducer = (
  state: GraphState,
  action: GraphAction
): GraphState => {
  switch (action.type) {
    case "ADD_GRAPH":
      return { ...state, graphs: [...state.graphs, action.payload] };
    case "DELETE_GRAPH":
      return {
        ...state,
        graphs: state.graphs.filter((graph) => graph.name !== action.payload),
      };
    case "RENAME_GRAPH":
      return {
        ...state,
        graphs: state.graphs.map((graph) =>
          graph.name === action.payload.oldName
            ? { ...graph, name: action.payload.newName }
            : graph
        ),
      };
    case "SET_GRAPHS":
      return { ...state, graphs: action.payload };
    default:
      return state;
  }
};

export const GraphDocumentProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(graphDocumentReducer, initialState);

  return (
    <GraphDocumentContext.Provider value={{ state, dispatch }}>
      {children}
    </GraphDocumentContext.Provider>
  );
};

export const useGraphDocumentState = () =>
  useContext(GraphDocumentContext).state;

export const useGraphDocumentDispatch = () =>
  useContext(GraphDocumentContext).dispatch;
