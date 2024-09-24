export type NodeId = number | string;

export interface INode {
  id: NodeId;
  label: string;
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

export type InitialPositionType = {
  top: number;
  left: number;
};

export type InitialPositionsType = {
  [key: string]: InitialPositionType;
};

export type Position = {
  x: number;
  y: number;
};
