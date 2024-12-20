import React from "react";
import { ReactComponent as DownloadIcon } from "assets/icons/download.svg";
import { ReactComponent as UploadIcon } from "assets/icons/upload.svg";
import { ReactComponent as RightArrowIcon } from "assets/icons/arrow-right.svg";
import { ReactComponent as LeftArrowIcon } from "assets/icons/arrow-left.svg";
import { ReactComponent as UpArrowIcon } from "assets/icons/arrow-up.svg";
import { ReactComponent as DownArrowIcon } from "assets/icons/arrow-down.svg";
import { ReactComponent as NewDocumentIcon } from "assets/icons/new-document.svg";
import { ReactComponent as DeleteIcon } from "assets/icons/delete.svg";
import { ReactComponent as InfoIcon } from "assets/icons/info.svg";
import { ReactComponent as OpenIcon } from "assets/icons/open.svg";
import { ReactComponent as UndoIcon } from "assets/icons/undo.svg";
import { ReactComponent as RedoIcon } from "assets/icons/redo.svg";
import { ReactComponent as ShortestPathIcon } from "assets/icons/shortest-path.svg";
import { ReactComponent as MinimumSpanningTreeIcon } from "assets/icons/minimum-spanning-tree.svg";
import { ReactComponent as GraphTraversalIcon } from "assets/icons/graph-traversal.svg";
import { ReactComponent as NetworkFlowIcon } from "assets/icons/network-flow.svg";
import { ReactComponent as MatchingIcon } from "assets/icons/matching.svg";
import { ReactComponent as SunIcon } from "assets/icons/sun.svg";
import { ReactComponent as MoonIcon } from "assets/icons/moon.svg";
import { ReactComponent as SaveIcon } from "assets/icons/save-document.svg";

interface IconProps {
  name: string;
  size?: string;
  style?: React.CSSProperties;
  props?: any;
}

const icons: {
  [key: string]: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string | undefined }
  >;
} = {
  download: DownloadIcon,
  upload: UploadIcon,
  "right-arrow": RightArrowIcon,
  "left-arrow": LeftArrowIcon,
  "up-arrow": UpArrowIcon,
  "down-arrow": DownArrowIcon,
  "new-document": NewDocumentIcon,
  delete: DeleteIcon,
  info: InfoIcon,
  open: OpenIcon,
  undo: UndoIcon,
  redo: RedoIcon,
  "shortest-path": ShortestPathIcon,
  "minimum-spanning-tree": MinimumSpanningTreeIcon,
  "graph-traversal": GraphTraversalIcon,
  "network-flow": NetworkFlowIcon,
  matching: MatchingIcon,
  sun: SunIcon,
  moon: MoonIcon,
  "save-document": SaveIcon,
};

const Icon: React.FC<IconProps> = ({ name, size = "sm", style, ...props }) => {
  const SvgIcon = icons[name];

  return SvgIcon ? (
    <SvgIcon
      style={{
        width: size,
        height: size,
        ...style,
      }}
      {...props}
    />
  ) : null;
};

export default Icon;
