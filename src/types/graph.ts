export type VerticeType = number | string;
export type Edge = [VerticeType, VerticeType];

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
