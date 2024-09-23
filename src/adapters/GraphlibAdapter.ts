import { Graph } from "@dagrejs/graphlib";
import dijkstra from "@dagrejs/graphlib/lib/alg/dijkstra";
import { IGraphAdapter } from "interfaces/IGraphAdapter";

export default class GraphlibAdapter implements IGraphAdapter {
  private graph: Graph;

  constructor() {
    this.graph = new Graph();
  }

  createGraph(): void {
    this.graph = new Graph();
  }

  addNode(node: { id: string; label: string }): void {
    this.graph.setNode(node.id, node);
  }

  addEdge(source: string, target: string, weight: number): void {
    this.graph.setEdge(source, target, weight);
  }

  runDijkstra(
    source: string
  ): Record<string, { distance: number; predecessor: string | null }> {
    const result = dijkstra(this.graph, source);
    const formattedResult: Record<
      string,
      { distance: number; predecessor: string | null }
    > = {};

    for (const node in result) {
      formattedResult[node] = {
        distance: result[node].distance,
        predecessor: result[node].predecessor ?? null,
      };
    }

    return formattedResult;
  }

  getNodes(): Array<{ id: string; label: string }> {
    return this.graph.nodes().map((node) => this.graph.node(node));
  }

  getEdges(): Array<{ source: string; target: string; weight: number }> {
    return this.graph.edges().map((edge) => ({
      source: edge.v,
      target: edge.w,
      weight: this.graph.edge(edge),
    }));
  }
}
