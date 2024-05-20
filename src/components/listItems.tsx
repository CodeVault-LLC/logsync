import * as React from "react";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AssignmentIcon from "@mui/icons-material/Assignment";
import { Archive, MonitorHeart, Search } from "@mui/icons-material";
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
      to="/monitor/$id/search"
      params={{ id: id.toString() }}
      style={{ color: "white", textDecoration: "none" }}
    >
      <ListItemButton>
        <ListItemIcon>
          <Search />
        </ListItemIcon>
        <ListItemText primary="Search" />
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
  </React.Fragment>
);

export const secondaryListItems = (
  <React.Fragment>
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Current month" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>
);
