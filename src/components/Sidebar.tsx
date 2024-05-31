import { Divider, IconButton, List, Toolbar, styled } from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { mainListItems, monitorTabs } from "./listItems";
import { useParams, useRouterState } from "@tanstack/react-router";

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

type SidebarProps = {
  open: boolean;
  toggleDrawer: () => void;
};

export const Sidebar: React.FC<SidebarProps> = ({ open, toggleDrawer }) => {
  const path = useRouterState().location.pathname;
  const { id }: { id: number } = useParams({ strict: false });

  return (
    <Drawer variant="permanent" open={open}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <IconButton onClick={toggleDrawer}>
          <ChevronLeftIcon />
        </IconButton>
      </Toolbar>
      <Divider />
      <List component="nav">
        {mainListItems}
        {path.includes("/monitor/") && (
          <>
            <Divider sx={{ my: 1 }} />
            {monitorTabs(id)}
          </>
        )}

        <Divider sx={{ my: 1 }} />
      </List>
    </Drawer>
  );
};
