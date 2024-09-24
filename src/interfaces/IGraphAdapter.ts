import { IEdge, INode, IShortestPath, NodeId } from "types/graph";

export interface IGraphAdapter {
  createGraph(): void;
  addNode(node: INode): void;
  addEdge(edge: IEdge): void;
  runDijkstra(source: NodeId): Record<NodeId, IShortestPath>;
  getNodes(): INode[];
  getEdges(): IEdge[];
}
