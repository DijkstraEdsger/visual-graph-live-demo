import { Outlet } from "react-router-dom";
import MenuToolbar from "components/MenuToolbar/MenuToolbar";
import Text from "components/atoms/Text";
import Icon from "components/atoms/Icon";
import MenuBar from "components/organisms/MenuBar";

type TItem = {
  label: string;
  onClick?: () => void;
  items?: TItem[];
};

const Layout = () => {
  const menus: TItem[] = [
    {
      label: "File",
      items: [
        {
          label: "New",
          onClick: () => console.log("New"),
        },
        {
          label: "Open",
          onClick: () => console.log("Open"),
        },
        {
          label: "Save",
          onClick: () => console.log("Save"),
        },
        {
          label: "Save As",
          onClick: () => console.log("Save As"),
        },
        {
          label: "Close",
          onClick: () => console.log("Close"),
        },
        {
          label: "Submenu",
          items: [
            {
              label: "Submenu 1",
              onClick: () => console.log("Submenu 1"),
            },
            {
              label: "Submenu 2",
              onClick: () => console.log("Submenu 2"),
            },
            {
              label: "Submenu 3",
              onClick: () => console.log("Submenu 3"),
              items: [
                {
                  label: "Submenu 3.1",
                  onClick: () => console.log("Submenu 3.1"),
                },
                {
                  label: "Submenu 3.2",
                  onClick: () => console.log("Submenu 3.2"),
                },
              ],
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
        },
        {
          label: "Redo",
          onClick: () => console.log("Redo"),
        },
        {
          label: "Cut",
          onClick: () => console.log("Cut"),
        },
        {
          label: "Copy",
          onClick: () => console.log("Copy"),
        },
        {
          label: "Paste",
          onClick: () => console.log("Paste"),
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
      onClick: () => console.log("Settings"),
    },
  ];

  return (
    <>
      {/* <MenuToolbar />
      <Text size="xl">Humberto</Text>
      <Icon name="download" />
      <Icon name="upload" />
      <Icon name="right-arrow" />
      <Icon name="left-arrow" />
      <Icon name="up-arrow" />
      <Icon name="down-arrow" />
      <Icon name="new-document" />
      <Icon name="delete" />
      <Icon name="info" /> */}
      <MenuBar menus={menus} />

      {/* <Outlet /> */}
    </>
  );
};

export default Layout;
