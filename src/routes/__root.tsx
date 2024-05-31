import { ThemeProvider } from "@emotion/react";
import { Box, Container, CssBaseline, Toolbar } from "@mui/material";
import {
  Outlet,
  createRootRouteWithContext,
  useRouterState,
} from "@tanstack/react-router";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";
import { useEffect, useState } from "react";
import { DarkTheme, RefineThemes } from "../packages/mui";
import { useCurrentUser } from "../hooks/useUser";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

export const RootPage: React.FC = () => {
  const path = useRouterState().location.pathname;
  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
    setOpen(!open);
  };

  const theme = { ...DarkTheme, ...RefineThemes.BlueDark };
  const { data: user, isFetching } = useCurrentUser();

  useEffect(() => {
    if (
      !user?.id &&
      !isFetching &&
      !(path === "/login" || path === "/register")
    ) {
      window.location.href = "/login";
    }
  });

  return (
    <ThemeProvider theme={theme}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Box sx={{ display: "flex" }}>
          <CssBaseline />
          {user?.id && <Navbar open={open} toggleDrawer={toggleDrawer} />}
          {user?.id && <Sidebar open={open} toggleDrawer={toggleDrawer} />}

          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
              <Outlet />
            </Container>
          </Box>
        </Box>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export const Route = createRootRouteWithContext<{
  router: unknown;
}>()({
  component: RootPage,
});
