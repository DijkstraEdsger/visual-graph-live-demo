import { ReactNode } from "react";
import Icon from "components/Icon";
import { useGraph } from "contexts/graphContext";
import { useThemeContext } from "contexts/themeContext";
import { ActiveAlgorithm } from "types/graph";
import classes from "./classes.module.scss";
import { useAppDispatch } from "contexts/app-context/root/provider";
import { UIActionType } from "contexts/app-context/ui/types";
import {
  useGraphDocumentDispatch,
  useGraphDocumentState,
} from "contexts/graph-document-context";
import { useUpdate } from "hooks/graph-document/useUpdate";
import GraphTraversalIcon from "components/Icon/Icons/GraphTraversalIcon";
import MinimumSpanningTreeIcon from "components/Icon/Icons/MinimumSpanningTreeIcon";
import ShortestPathIcon from "components/Icon/Icons/ShortestPathIcon";
import NetworkFlowIcon from "components/Icon/Icons/NetworkFlowIcon";
import MatchingIcon from "components/Icon/Icons/MatchingIcon";

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
    cleanGraph,
  } = useGraph();
  const { theme, toggleTheme } = useThemeContext();
  const dispatch = useAppDispatch();
  const { openedDocument } = useGraphDocumentState();
  const { updateGraphDocument } = useUpdate();
  const { isDocumentModified } = useGraphDocumentState();
  const appDispatch = useAppDispatch();
  const documentDispatch = useGraphDocumentDispatch();

  const openSaveDocumentModalHandler = () => {
    if (openedDocument) {
      updateGraphDocument();
    } else {
      dispatch({ type: UIActionType.UI_OPEN_SAVE_DOCUMENT_MODAL });
    }
  };

  const openOpenDocumentModalHandler = () => {
    if (isDocumentModified) {
      appDispatch({ type: UIActionType.UI_OPEN_WANT_TO_SAVE_MODAL });
      documentDispatch({ type: "SET_IS_PENDING_TO_OPEN", payload: true });
    } else {
      dispatch({ type: UIActionType.UI_OPEN_OPEN_DOCUMENT_MODAL });
    }
  };

  const newDocumentHandler = () => {
    if (isDocumentModified) {
      appDispatch({ type: UIActionType.UI_OPEN_WANT_TO_SAVE_MODAL });
      documentDispatch({ type: "SET_IS_NEW_DOCUMENT_PENDING", payload: true });
    } else {
      cleanGraph?.();
      documentDispatch({
        type: "OPEN_GRAPH",
        payload: null,
      });
    }
  };

  const openTransitionSpeedSettingModal = () => {
    appDispatch({ type: UIActionType.UI_OPEN_TRANSITION_SPEED_SETTING_MODAL });
  };

  const menus: TItem[] = [
    {
      label: "File",
      items: [
        {
          label: "New",
          onClick: newDocumentHandler,
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
          icon: <Icon name="upload" size="16px" />,
        },
      ],
    },
    {
      label: "Edit",
      items: [
        {
          label: (
            <div className={classes.edit_menu_item}>
              Undo
              <span className={classes.edit_menu_item__keys}>
                <kbd>Ctrl</kbd>+<kbd>Z</kbd>
              </span>
            </div>
          ),
          onClick: undo,
          icon: <Icon name="undo" size="16px" />,
        },
        {
          label: (
            <div className={classes.edit_menu_item}>
              Redo
              <span className={classes.edit_menu_item__keys}>
                <kbd>Ctrl</kbd>+<kbd>Y</kbd>
              </span>
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
          icon: <ShortestPathIcon size="16px" />,
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
          icon: <MinimumSpanningTreeIcon size="16px" />,
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
          // icon: <Icon name="graph-traversal" size="16px" />,
          icon: <GraphTraversalIcon size="16px" />,
          items: [
            {
              label: "Depth First Search",
              onClick: () => setActiveAlgorithmHandler?.(ActiveAlgorithm.DFS),
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
          icon: <NetworkFlowIcon size="16px" />,
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
          icon: <MatchingIcon size="16px" />,
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
        {
          label: "Transition speed",
          onClick: openTransitionSpeedSettingModal,
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
