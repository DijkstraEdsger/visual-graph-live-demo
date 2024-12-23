import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { IEdge, INode } from "types/graph";

export interface DocumentGraph {
  name: string;
  data: {
    vertices: INode[];
    edges: IEdge[];
    isDirected?: boolean;
  };
  createdDate?: string;
  modifiedDate?: string;
}

interface GraphState {
  graphs: DocumentGraph[];
  openedDocument: DocumentGraph | null;
  isDocumentModified: boolean;
  isNewDocumentPending: boolean;
}

interface OpenGraphAction {
  type: "OPEN_GRAPH";
  payload?: DocumentGraph | null;
}

interface AddGraphAction {
  type: "ADD_GRAPH";
  payload: DocumentGraph;
}

interface UpdateGraphAction {
  type: "UPDATE_GRAPH";
  payload?: DocumentGraph | null;
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
  payload: DocumentGraph[];
}

interface SetIsDocumentModifiedAction {
  type: "SET_IS_DOCUMENT_MODIFIED";
  payload: boolean;
}

interface SetIsNewDocumentPendingAction {
  type: "SET_IS_NEW_DOCUMENT_PENDING";
  payload: boolean;
}

type GraphAction =
  | AddGraphAction
  | DeleteGraphAction
  | RenameGraphAction
  | SetGraphsAction
  | OpenGraphAction
  | UpdateGraphAction
  | SetIsDocumentModifiedAction
  | SetIsNewDocumentPendingAction;

export const initialState: GraphState = {
  graphs: [],
  openedDocument: null,
  isDocumentModified: false,
  isNewDocumentPending: false,
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
    case "OPEN_GRAPH":
      return {
        ...state,
        openedDocument: action.payload ? structuredClone(action.payload) : null,
        isDocumentModified: false,
      };
    case "ADD_GRAPH":
      return {
        ...state,
        graphs: [...state.graphs, action.payload],
      };
    case "UPDATE_GRAPH":
      // const documentsCopy = [...structuredClone(state.graphs)];

      // const findDocumentIndex = state.graphs?.findIndex(
      //   (document) => document.name === state.openedDocument?.name
      // );

      // if (findDocumentIndex > -1) {
      //   documentsCopy[findDocumentIndex] = structuredClone(action.payload);
      // }

      return {
        ...state,
        // graphs: documentsCopy,
        openedDocument: action.payload ? structuredClone(action.payload) : null,
        isDocumentModified: false,
      };
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
    case "SET_IS_DOCUMENT_MODIFIED":
      return {
        ...state,
        isDocumentModified: action.payload,
      };
    case "SET_IS_NEW_DOCUMENT_PENDING":
      return {
        ...state,
        isNewDocumentPending: action.payload,
      };
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
