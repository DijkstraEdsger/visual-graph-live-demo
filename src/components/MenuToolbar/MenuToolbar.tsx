import React from "react";
import * as Menubar from "@radix-ui/react-menubar";
import {
  CheckIcon,
  ChevronRightIcon,
  DotFilledIcon,
  DownloadIcon,
  UploadIcon,
} from "@radix-ui/react-icons";
import "./styles.css";
import { useGraph } from "contexts/graphContext";
import {
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
} from "components/molecules";
import MenubarTrigger from "components/atoms/MenubarTrigger";
import Text from "components/atoms/Text";

const RADIO_ITEMS = ["Andy", "Benoît", "Luis"];
const CHECK_ITEMS = ["Always Show Bookmarks Bar", "Always Show Full URLs"];

const MenubarDemo = () => {
  const [checkedSelection, setCheckedSelection] = React.useState([
    CHECK_ITEMS[1],
  ]);
  const [radioSelection, setRadioSelection] = React.useState(RADIO_ITEMS[2]);
  const { inputFileRef, downloadGraphAsTxt } = useGraph();

  return (
    <Menubar.Root className="MenubarRoot">
      <Menubar.Menu>
        <MenubarTrigger>File</MenubarTrigger>
        <Menubar.Portal>
          <MenubarContent align="start" sideOffset={5} alignOffset={-3}>
            <MenubarItem>
            <Text size="sm" >Humberto</Text> <div className="RightSlot">⌘ T</div>
            </MenubarItem>
            <MenubarItem>
              New Window <div className="RightSlot">⌘ N</div>
            </MenubarItem>
            <MenubarItem disabled>New Incognito Window</MenubarItem>
            <MenubarSeparator />
            <MenubarItem onClick={downloadGraphAsTxt}>
              <DownloadIcon className="Icon" /> Download Graph
            </MenubarItem>
            <MenubarItem onClick={downloadGraphAsTxt}>Test</MenubarItem>
            <MenubarItem onClick={() => inputFileRef.current?.click()}>
              <UploadIcon className="Icon" /> Upload Graph
            </MenubarItem>
            <MenubarSeparator />
            <Menubar.Sub>
              <Menubar.SubTrigger className="MenubarSubTrigger">
                Share
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>
              <Menubar.Portal>
                <Menubar.SubContent
                  className="MenubarSubContent"
                  alignOffset={-5}
                >
                  <MenubarItem>Email Link</MenubarItem>
                  <MenubarItem>Messages</MenubarItem>
                  <MenubarItem>Notes</MenubarItem>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <MenubarSeparator />
            <MenubarItem>
              Print… <div className="RightSlot">⌘ P</div>
            </MenubarItem>
          </MenubarContent>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Edit</Menubar.Trigger>
        <Menubar.Portal>
          <MenubarContent align="start" sideOffset={5} alignOffset={-3}>
            <MenubarItem>
              Undo <div className="RightSlot">⌘ Z</div>
            </MenubarItem>
            <MenubarItem>
              Redo <div className="RightSlot">⇧ ⌘ Z</div>
            </MenubarItem>
            <MenubarSeparator />
            <Menubar.Sub>
              <Menubar.SubTrigger className="MenubarSubTrigger">
                Find
                <div className="RightSlot">
                  <ChevronRightIcon />
                </div>
              </Menubar.SubTrigger>

              <Menubar.Portal>
                <Menubar.SubContent
                  className="MenubarSubContent"
                  alignOffset={-5}
                >
                  <MenubarItem>Search the web…</MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Find…</MenubarItem>
                  <MenubarItem>Find Next</MenubarItem>
                  <MenubarItem>Find Previous</MenubarItem>
                </Menubar.SubContent>
              </Menubar.Portal>
            </Menubar.Sub>
            <MenubarSeparator />
            <MenubarItem>Cut</MenubarItem>
            <MenubarItem>Copy</MenubarItem>
            <MenubarItem>Paste</MenubarItem>
          </MenubarContent>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">View</Menubar.Trigger>
        <Menubar.Portal>
          <MenubarContent align="start" sideOffset={5} alignOffset={-14}>
            {CHECK_ITEMS.map((item) => (
              <Menubar.CheckboxItem
                className="MenubarCheckboxItem inset"
                key={item}
                checked={checkedSelection.includes(item)}
                onCheckedChange={() =>
                  setCheckedSelection((current) =>
                    current.includes(item)
                      ? current.filter((el) => el !== item)
                      : current.concat(item)
                  )
                }
              >
                <Menubar.ItemIndicator className="MenubarItemIndicator">
                  <CheckIcon />
                </Menubar.ItemIndicator>
                {item}
              </Menubar.CheckboxItem>
            ))}
            <MenubarSeparator />
            <MenubarItem>
              Reload <div className="RightSlot">⌘ R</div>
            </MenubarItem>
            <MenubarItem disabled>
              Force Reload <div className="RightSlot">⇧ ⌘ R</div>
            </MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Toggle Fullscreen</MenubarItem>
            <MenubarSeparator />
            <MenubarItem>Hide Sidebar</MenubarItem>
          </MenubarContent>
        </Menubar.Portal>
      </Menubar.Menu>

      <Menubar.Menu>
        <Menubar.Trigger className="MenubarTrigger">Profiles</Menubar.Trigger>
        <Menubar.Portal>
          <MenubarContent align="start" sideOffset={5} alignOffset={-14}>
            <Menubar.RadioGroup
              value={radioSelection}
              onValueChange={setRadioSelection}
            >
              {RADIO_ITEMS.map((item) => (
                <Menubar.RadioItem
                  className="MenubarRadioItem inset"
                  key={item}
                  value={item}
                >
                  <Menubar.ItemIndicator className="MenubarItemIndicator">
                    <DotFilledIcon />
                  </Menubar.ItemIndicator>
                  {item}
                </Menubar.RadioItem>
              ))}
              <MenubarSeparator />
              <MenubarItem>Edit…</MenubarItem>
              <MenubarSeparator />
              <MenubarItem>Add Profile…</MenubarItem>
            </Menubar.RadioGroup>
          </MenubarContent>
        </Menubar.Portal>
      </Menubar.Menu>
    </Menubar.Root>
  );
};

export default MenubarDemo;
