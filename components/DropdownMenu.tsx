import * as React from "react";
import Button from "@mui/material/Button";
import { Menu, MenuItem } from "@mui/material";

export default function DropdownMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mr-auto ml-4">
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        style={{
          color: "white",
          padding: "8px",
          fontWeight: 300,
          textTransform: "none",
          fontFamily: "inherit",
          fontSize: "16px",
        }}
      >
        Browse
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleClose}>Tv Shows</MenuItem>
        <MenuItem onClick={handleClose}>Movies</MenuItem>
        <MenuItem onClick={handleClose}>News & Popular</MenuItem>
        <MenuItem onClick={handleClose}>My List</MenuItem>
      </Menu>
    </div>
  );
}
