import { ReactNode } from "react";
import Icon from "components/Icon";
import { useGraph } from "contexts/graphContext";
import { useThemeContext } from "contexts/themeContext";
import { ActiveAlgorithm } from "types/graph";
import classes from "./classes.module.scss";
import { useAppDispatch } from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";

type TItem = {
  label: string | ReactNode;
  onClick?: () => void;
  items?: TItem[];
  icon?: React.ReactNode;
  disabled?: boolean;
};

const useHeaderVM = () => {
  const {
    inputFileRef,
    downloadGraphAsTxt,
    setActiveAlgorithmHandler,
    undo,
    redo,
  } = useGraph();
  const { theme, toggleTheme } = useThemeContext();
  const dispatch = useAppDispatch();

  const openSaveDocumentModalHandler = () => {
    dispatch({ type: UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL });
  };

  const openOpenDocumentModalHandler = () => {
    dispatch({ type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL });
  };

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
          onClick: openOpenDocumentModalHandler,
          icon: <Icon name="open" size="16px" />,
        },
        {
          label: "Save",
          onClick: openSaveDocumentModalHandler,
          icon: <Icon name="save-document" size="16px" />,
        },
        {
          label: "Download",
          onClick: downloadGraphAsTxt,
          icon: <Icon name="download" size="16px" />,
        },
        {
          label: "Upload",
          onClick: () => inputFileRef.current?.click(),
          icon: <Icon name="open" size="16px" />,
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: (
            <div className={classes.edit_menu_item}>
              Undo<span className={classes.edit_menu_item__keys}>Ctrl+Z</span>
            </div>
          ),
          onClick: undo,
          icon: <Icon name="undo" size="16px" />,
        },
        {
          label: (
            <div className={classes.edit_menu_item}>
              Redo<span className={classes.edit_menu_item__keys}>Ctrl+Y</span>
            </div>
          ),
          onClick: redo,
          icon: <Icon name="redo" size="16px" />,
        },
      ],
    },
    // {
    //   label: "View",
    //   items: [
    //     {
    //       label: "Zoom In",
    //       onClick: () => console.log("Zoom In"),
    //     },
    //     {
    //       label: "Zoom Out",
    //       onClick: () => console.log("Zoom Out"),
    //     },
    //     {
    //       label: "Full Screen",
    //       onClick: () => console.log("Full Screen"),
    //     },
    //   ],
    // },
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
              disabled: true,
              onClick: () => console.log("Kruskal's Algorithm"),
            },
            {
              label: "Prim",
              onClick: () => setActiveAlgorithmHandler?.(ActiveAlgorithm.PRIM),
            },
          ],
        },
        {
          label: "Graph Traversal",
          icon: <Icon name="graph-traversal" size="16px" />,
          items: [
            {
              label: "Depth First Search",
              disabled: true,
              onClick: () => console.log("Depth First Search"),
            },
            {
              label: "Breadth First Search",
              disabled: true,
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
              disabled: true,
              onClick: () => console.log("Ford-Fulkerson Algorithm"),
            },
            {
              label: "Edmonds-Karp",
              disabled: true,
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
              disabled: true,
              onClick: () => console.log("Bipartite Matching"),
            },
            {
              label: "Maximum Flow and Minimum Cut",
              disabled: true,
              onClick: () => console.log("Maximum Flow and Minimum Cut"),
            },
          ],
        },
      ],
    },
    {
      label: "Help",
      items: [
        {
          label: "About",
          disabled: true,
          onClick: () => console.log("About"),
        },
      ],
    },
    {
      label: "Settings",
      items: [
        {
          label: `Change to ${theme === "light" ? "Dark" : "Light"} mode`,
          onClick: toggleTheme,
        },
        // {
        //   label: "Change Language",
        //   onClick: () => console.log("Change Language"),
        // },
      ],
    },
  ];

  return {
    menus,
  };
};

export default useHeaderVM;
