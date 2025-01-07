import { IEdge, INode, NodeId } from "types/graph";

export interface IGraphAdapter {
  createGraph(): void;
  addNode(node: INode): void;
  addEdge(edge: IEdge): void;
  runDijkstra({
    vertices,
    edges,
    startVertex,
    endVertex,
    isDirected,
  }: {
    vertices: INode[];
    edges: IEdge[];
    startVertex: NodeId;
    endVertex: NodeId;
    isDirected: boolean;
  }): NodeId[];
  getNodes(): INode[];
  getEdges(): IEdge[];
  removeNode(node: NodeId): void;
  removeEdge(edge: IEdge): void;
}
