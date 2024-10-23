import { Graph } from "@dagrejs/graphlib";
import dijkstra from "@dagrejs/graphlib/lib/alg/dijkstra";
import prim from "@dagrejs/graphlib/lib/alg/prim";
import { IGraphAdapter } from "interfaces/IGraphAdapter";
import { IEdge, INode, IShortestPath, NodeId } from "types/graph";

export default class GraphlibAdapter implements IGraphAdapter {
  private graph: Graph;

  constructor(isDirected = false, nodes: INode[] = [], edges: IEdge[] = []) {
    this.graph = new Graph({ directed: isDirected });
    nodes.forEach((node) => this.addNode(node));
    edges.forEach((edge) => this.addEdge(edge));
  }

  createGraph(
    isDirected = false,
    nodes: INode[] = [],
    edges: IEdge[] = []
  ): void {
    this.graph = new Graph({ directed: isDirected });
    nodes.forEach((node) => this.addNode(node));
    edges.forEach((edge) => this.addEdge(edge));
  }

  addNode(node: INode): void {
    const id = node.id.toString();
    this.graph.setNode(id, node);
  }

  addEdge(edge: IEdge): void {
    const source = edge.source.toString();
    const target = edge.target.toString();
    this.graph.setEdge(source, target, edge.weight);
  }

  runDijkstra(source: NodeId): Record<NodeId, IShortestPath> {
    const result = dijkstra(this.graph, source.toString());
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

  runBellmanFord(source: NodeId): Record<NodeId, IShortestPath> {
    const result = dijkstra(this.graph, source.toString());
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

  private weightFunc = (edge: { v: string; w: string }) =>
    this.graph.edge(edge);

  runPrim(): { nodes: NodeId[]; edges: IEdge[] } {
    const mst = prim(this.graph, this.weightFunc);

    const nodes = mst.nodes().map((node: string) => parseInt(node));
    const edges = mst.edges().map((edge: any) => ({
      source: edge.v,
      target: edge.w,
      weight: mst.edge(edge),
    }));

    return { nodes, edges };
  }

  getNodes(): Array<INode> {
    return this.graph.nodes().map((node) => this.graph.node(node));
  }

  getEdges(): Array<IEdge> {
    return this.graph.edges().map((edge) => ({
      source: edge.v,
      target: edge.w,
      weight: this.graph.edge(edge),
    }));
  }

  removeNode(node: NodeId): void {
    this.graph.removeNode(node.toString());
  }

  removeEdge(edge: IEdge): void {
    this.graph.removeEdge(edge.source.toString(), edge.target.toString());
  }

  buildPath(
    dijkstraResult: Record<NodeId, IShortestPath>,
    source: string,
    target: string
  ): string[] {
    const path: string[] = [];
    let current: string | null = target;

    while (current !== null) {
      path.push(current);
      if (current === source) break;
      current = dijkstraResult[current].predecessor?.toString() ?? null;
    }

    if (current === null) {
      throw new Error(`No path found from ${source} to ${target}`);
    }

    return path.reverse();
  }
}
