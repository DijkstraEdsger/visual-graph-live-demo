import { useGraph } from "contexts/graphContext";
import { ActiveAlgorithm } from "types/graph";
import Icon from "components/atoms/Icon";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
  icon?: React.ReactNode;
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
          icon: <Icon name="new-document" size="16px" />
        },
        {
          label: "Open",
          onClick: () => inputFileRef.current?.click(),
          icon: <Icon name="open" size="16px" />
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
          label: "Shortest Path Algorithms",
          items: [
            {
              label: "Dijkstra's Algorithm",
              onClick: () =>
                setActiveAlgorithmHandler?.(ActiveAlgorithm.DIJKSTRA),
            },
            {
              label: "Bellman-Ford Algorithm",
              onClick: () => console.log("Bellman-Ford Algorithm"),
            },
            {
              label: "Floyd-Warshall Algorithm",
              onClick: () => console.log("Floyd-Warshall Algorithm"),
            },
            {
              label: "A* Algorithm",
              onClick: () => console.log("A* Algorithm"),
            },
          ],
        },
        {
          label: "Minimum Spanning Tree Algorithms",
          items: [
            {
              label: "Kruskal's Algorithm",
              onClick: () => console.log("Kruskal's Algorithm"),
            },
            {
              label: "Prim's Algorithm",
              onClick: () => console.log("Prim's Algorithm"),
            },
          ],
        },
        {
          label: "Graph Traversal Algorithms",
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
          label: "Network Flow Algorithms",
          items: [
            {
              label: "Ford-Fulkerson Algorithm",
              onClick: () => console.log("Ford-Fulkerson Algorithm"),
            },
            {
              label: "Edmonds-Karp Algorithm",
              onClick: () => console.log("Edmonds-Karp Algorithm"),
            },
          ],
        },
        {
          label: "Matching Algorithms",
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
          icon: <Icon name="undo" size="16px" />
        },
        {
          label: "Redo",
          onClick: () => console.log("Redo"),
          icon: <Icon name="redo" size="16px" />
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
