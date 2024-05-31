import {
  Toolbar,
  IconButton,
  Typography,
  Badge,
  styled,
  Popper,
  Paper,
  List,
  ListItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import NotificationsIcon from "@mui/icons-material/Notifications";

import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import { Link } from "@tanstack/react-router";
import { useNotifications } from "../hooks/useNotifications";
import { useState } from "react";

const drawerWidth: number = 240;
type NavbarProps = {
  open: boolean;
  toggleDrawer: () => void;
};

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Navbar: React.FC<NavbarProps> = ({ open, toggleDrawer }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const { data: notifications } = useNotifications();

  return (
    <AppBar position="absolute" open={open}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={toggleDrawer}
          sx={{
            marginRight: "36px",
            ...(open && { display: "none" }),
          }}
        >
          <MenuIcon />
        </IconButton>
        <Link
          to="/"
          style={{
            color: "inherit",
            textDecoration: "none",
            flexGrow: 1,
            flexWrap: "nowrap",
          }}
        >
          <Typography component="h1" variant="h6" color="inherit">
            LogSync
          </Typography>
        </Link>
        <IconButton
          color="inherit"
          onClick={(event) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }}
        >
          <Badge badgeContent={notifications?.length || 0} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Popper open={Boolean(anchorEl)} anchorEl={anchorEl}>
          <Paper>
            <List>
              {notifications?.map((notification) => (
                <a
                  href={notification.link}
                  style={{
                    color: "inherit",
                    textDecoration: "none",
                  }}
                >
                  <ListItem
                    key={notification.id}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      width: 300,
                      height: "auto",
                      padding: 2,
                      borderBottom: "1px solid #ccc",

                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    <Typography>{notification.title}</Typography>
                    <Typography>{notification.message}</Typography>
                  </ListItem>
                </a>
              ))}
            </List>
          </Paper>
        </Popper>
      </Toolbar>
    </AppBar>
  );
};
