export interface IGraphAdapter {
  createGraph(): void;
  addNode(node: { id: string; label: string }): void;
  addEdge(source: string, target: string, weight: number): void;
  runDijkstra(
    source: string
  ): Record<string, { distance: number; predecessor: string | null }>;
  getNodes(): Array<{ id: string; label: string }>;
  getEdges(): Array<{ source: string; target: string; weight: number }>;
}
