import { useGraph } from "contexts/graphContext";
import { ActiveAlgorithm } from "types/graph";
import Icon from "components/atoms/Icon";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
  icon?: React.ReactNode;
  disabled?: boolean;
};

const useHeaderVM = () => {
  const { inputFileRef, downloadGraphAsTxt, setActiveAlgorithmHandler } =
    useGraph();
  const menus: TItem[] = [
    {
      label: "File",
      items: [
        {
          label: "New",
          onClick: () => console.log("New"),
          icon: <Icon name="new-document" size="16px" />,
        },
        {
          label: "Open",
          onClick: () => inputFileRef.current?.click(),
          icon: <Icon name="open" size="16px" />,
        },
        {
          label: "Download",
          onClick: downloadGraphAsTxt,
          icon: <Icon name="download" size="16px" />,
        },
        {
          label: "Close",
          onClick: () => console.log("Close"),
        },
      ],
    },
    {
      label: "Algorithms",
      items: [
        {
          label: "Shortest Path",
          icon: <Icon name="shortest-path" size="16px" />,
          items: [
            {
              label: "Dijkstra",
              onClick: () =>
                setActiveAlgorithmHandler?.(ActiveAlgorithm.DIJKSTRA),
            },
            {
              label: "Bellman-Ford",
              disabled: true,
              onClick: () =>
                setActiveAlgorithmHandler?.(ActiveAlgorithm.BELLMAN_FORD),
            },
            {
              label: "Floyd-Warshall",
              disabled: true,
              onClick: () => console.log("Floyd-Warshall Algorithm"),
            },
            {
              label: "A*",
              disabled: true,
              onClick: () => console.log("A* Algorithm"),
            },
          ],
        },
        {
          label: "Minimum Spanning Tree",
          icon: <Icon name="minimum-spanning-tree" size="16px" />,
          items: [
            {
              label: "Kruskal",
              onClick: () => console.log("Kruskal's Algorithm"),
            },
            {
              label: "Prim",
              onClick: () => console.log("Prim's Algorithm"),
            },
          ],
        },
        {
          label: "Graph Traversal",
          icon: <Icon name="graph-traversal" size="16px" />,
          items: [
            {
              label: "Depth First Search",
              onClick: () => console.log("Depth First Search"),
            },
            {
              label: "Breadth First Search",
              onClick: () => console.log("Breadth First Search"),
            },
          ],
        },
        {
          label: "Network Flow",
          icon: <Icon name="network-flow" size="16px" />,
          items: [
            {
              label: "Ford-Fulkerson",
              onClick: () => console.log("Ford-Fulkerson Algorithm"),
            },
            {
              label: "Edmonds-Karp",
              onClick: () => console.log("Edmonds-Karp Algorithm"),
            },
          ],
        },
        {
          label: "Matching",
          icon: <Icon name="matching" size="16px" />,
          items: [
            {
              label: "Bipartite Matching",
              onClick: () => console.log("Bipartite Matching"),
            },
            {
              label: "Maximum Flow and Minimum Cut",
              onClick: () => console.log("Maximum Flow and Minimum Cut"),
            },
          ],
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: "Undo",
          onClick: () => console.log("Undo"),
          icon: <Icon name="undo" size="16px" />,
        },
        {
          label: "Redo",
          onClick: () => console.log("Redo"),
          icon: <Icon name="redo" size="16px" />,
        },
      ],
    },
    {
      label: "View",
      items: [
        {
          label: "Zoom In",
          onClick: () => console.log("Zoom In"),
        },
        {
          label: "Zoom Out",
          onClick: () => console.log("Zoom Out"),
        },
        {
          label: "Full Screen",
          onClick: () => console.log("Full Screen"),
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "About",
          onClick: () => console.log("About"),
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: "Change Theme",
          onClick: () => console.log("Change Theme"),
        },
        {
          label: "Change Language",
          onClick: () => console.log("Change Language"),
        },
      ],
    },
  ];

  return {
    menus,
  };
};

export default useHeaderVM;
