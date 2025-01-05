/* eslint-disable spellcheck/spell-checker */
declare module "@dagrejs/graphlib/lib/alg/dijkstra" {
  import { Graph } from "@dagrejs/graphlib";

  interface DijkstraResult {
    distance: number;
    predecessor?: string;
  }

  function dijkstra(
    graph: Graph,
    source: string,
    weightFn?: (edge: any) => number,
    edgeFn?: (v: string) => string[]
  ): { [node: string]: DijkstraResult };

  export = dijkstra;
}

declare module "@dagrejs/graphlib/lib/alg/prim";
