export type NodeId = number | string;

export type InitialPositionType = {
  top: number;
  left: number;
};

export interface INode {
  id: NodeId;
  label: string;
  position: InitialPositionType;
}

export interface IEdge {
  source: NodeId;
  target: NodeId;
  weight: number;
  directed?: boolean;
}

export interface IShortestPath {
  distance: number;
  predecessor: NodeId | null;
}

export type InitialPositionsType = {
  [key: string]: InitialPositionType;
};

export type Position = {
  x: number;
  y: number;
};

export enum ActiveAlgorithm {
  DIJKSTRA = "DIJKSTRA",
  BELLMAN_FORD = "BELLMAN FORD",
  BFS = "BFS",
  DFS = "DFS",
  PRIM = "PRIM",
}

export interface IGraphFile {
  vertices: INode[];
  edges: IEdge[];
  isDirected?: boolean;
}
