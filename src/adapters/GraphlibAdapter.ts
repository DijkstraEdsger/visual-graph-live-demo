import { Graph } from "@dagrejs/graphlib";
import dijkstra from "@dagrejs/graphlib/lib/alg/dijkstra";
import prim from "@dagrejs/graphlib/lib/alg/prim";
import { IGraphAdapter } from "interfaces/IGraphAdapter";
import { IEdge, INode, IShortestPath, NodeId } from "types/graph";
import GraphV3 from "graphology";
import { dfsFromNode } from "graphology-traversal";

export default class GraphlibAdapter implements IGraphAdapter {
  private graph: Graph;

  constructor(isDirected = false, nodes: INode[] = [], edges: IEdge[] = []) {
    this.graph = new Graph({ directed: isDirected });
    nodes.forEach((node) => this.addNode(node));
    edges.forEach((edge) => this.addEdge(edge));
    // this.graph.
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

  isCompleteGraph = (vertices: INode[] = [], edges: IEdge[] = []): boolean => {
    const n = vertices.length;

    if (n === 0 && edges.length === 0) {
      return true;
    }

    const requiredNumberOfEdges = (n * (n - 1)) / 2;

    if (edges.length !== requiredNumberOfEdges) {
      return false;
    }

    const modifiedVertices = vertices.map((vertice) => vertice.id);
    const modifiedEdegs = edges.map((edge) => [edge.source, edge.target]);

    const edgeSet = new Set(modifiedEdegs.map((edge) => JSON.stringify(edge)));

    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const edge1 = JSON.stringify([
          modifiedVertices[i],
          modifiedVertices[j],
        ]);
        const edge2 = JSON.stringify([
          modifiedVertices[j],
          modifiedVertices[i],
        ]);

        if (!edgeSet.has(edge1) && !edgeSet.has(edge2)) {
          return false;
        }
      }
    }

    return true;
  };

  // isBipartite(): boolean {

  // }

  dfs({
    vertices,
    edges,
    startVertex,
    isDirected,
  }: {
    vertices: INode[];
    edges: IEdge[];
    startVertex: NodeId;
    isDirected: boolean;
  }): { edges: IEdge[] } {
    const graphV3 = new GraphV3({
      type: isDirected ? "directed" : "undirected",
    });

    vertices.forEach((vertex) => {
      graphV3.addNode(vertex.id);
    });

    edges.forEach((edge) => {
      graphV3.addEdge(edge.source, edge.target);
    });

    const trackEnteringVertices: any[] = [];
    const stackEnteringVerticesDepth: any[] = [];
    const trackEdges: IEdge[] = [];

    dfsFromNode(graphV3, startVertex, function (node, attr, depth) {
      if (trackEnteringVertices.length > 0) {
        if (
          depth >
          stackEnteringVerticesDepth[stackEnteringVerticesDepth.length - 1]
        ) {
          const addEdgev3: IEdge = {
            source: trackEnteringVertices[trackEnteringVertices.length - 1],
            target: node,
            weight: 0,
          };
          trackEdges.push(addEdgev3);
          trackEnteringVertices.push(node);
          stackEnteringVerticesDepth.push(depth);
        } else {
          while (
            depth <=
            stackEnteringVerticesDepth[stackEnteringVerticesDepth.length - 1]
          ) {
            trackEnteringVertices.pop();
            stackEnteringVerticesDepth.pop();
          }

          const addEdgev3: IEdge = {
            source: trackEnteringVertices[trackEnteringVertices.length - 1],
            target: node,
            weight: 0,
          };
          trackEdges.push(addEdgev3);
          trackEnteringVertices.push(node);
          stackEnteringVerticesDepth.push(depth);
        }
      } else {
        trackEnteringVertices.push(node);
        stackEnteringVerticesDepth.push(depth);
      }
    });

    return { edges: trackEdges };
  }
}
