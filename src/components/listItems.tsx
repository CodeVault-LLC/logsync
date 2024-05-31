import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import { Archive, MonitorHeart, Settings } from "@mui/icons-material";
import { Link } from "@tanstack/react-router";

export const mainListItems = (
  <React.Fragment>
    <Link to="/" style={{ color: "white", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItemButton>
    </Link>

    <Link to="/monitors" style={{ color: "white", textDecoration: "none" }}>
      <ListItemButton>
        <ListItemIcon>
          <MonitorHeart />
        </ListItemIcon>
        <ListItemText primary="Monitors" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);

export const monitorTabs = (id: number) => (
  <React.Fragment>
    <Link
      to="/monitor/$id"
      params={{ id: id.toString() }}
      style={{ color: "white", textDecoration: "none" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Monitor Dashboard" />
      </ListItemButton>
    </Link>

    <Link
      to="/monitor/$id/logs"
      params={{ id: id.toString() }}
      style={{ color: "white", textDecoration: "none" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Archive />
        </ListItemIcon>
        <ListItemText primary="Logs" />
      </ListItemButton>
    </Link>

    <Link
      to="/monitor/$id/settings"
      params={{ id: id.toString() }}
      style={{ color: "white", textDecoration: "none" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItemButton>
    </Link>
  </React.Fragment>
);
