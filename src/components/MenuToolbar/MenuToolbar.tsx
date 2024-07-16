// create a menu toolbar component that will be used in the header of the application
// use MUI components
// the toolbar is horizontal and should contain the following buttons:
// - File (dropdown) -> New, Open, Download
// - Edit (dropdown) -> Cut, Copy, Paste
// - View (dropdown) -> Zoom in, Zoom out
// - Help (dropdown) -> About
// - Run (button) -> Run

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Menu,
  MenuItem,
} from "@mui/material";

const MenuToolbar = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [menuId, setMenuId] = useState("");

  const handleClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: React.SetStateAction<string>
  ) => {
    setAnchorEl(event.currentTarget);
    setMenuId(id);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuId("");
  };

  const menuOptions: { [key: string]: string[] } = {
    File: ["New", "Open", "Download"],
    Edit: ["Cut", "Copy", "Paste"],
    View: ["Zoom in", "Zoom out"],
    Help: ["About"],
  };

  return (
    <AppBar position="static">
      <Toolbar>
        {Object.keys(menuOptions).map((option) => (
          <div key={option}>
            <Button
              color="inherit"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(e) => handleClick(e, option)}
            >
              {option}
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl) && menuId === option}
              onClose={handleClose}
            >
              {menuOptions[option].map((item) => (
                <MenuItem key={item} onClick={handleClose}>
                  {item}
                </MenuItem>
              ))}
            </Menu>
          </div>
        ))}
        <Button color="inherit" onClick={() => console.log("Run")}>
          Run
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default MenuToolbar;
