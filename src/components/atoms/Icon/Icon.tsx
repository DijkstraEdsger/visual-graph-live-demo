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
};

const Icon: React.FC<IconProps> = ({ name, size = "sm", style, ...props }) => {
  const SvgIcon = icons[name];

  return SvgIcon ? <SvgIcon style={style} {...props} /> : null;
};

export default Icon;