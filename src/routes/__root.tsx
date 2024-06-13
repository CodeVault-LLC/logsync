import { AppShell, createTheme, MantineProvider } from "@mantine/core";
import {
  Outlet,
  createRootRouteWithContext,
  useParams,
  useRouterState,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { useCurrentUser } from "../hooks/useUser";
import { useDisclosure } from "@mantine/hooks";
import { Navbar } from "../components/Navbar";
import { Sidebar } from "../components/Sidebar";

export const RootPage: React.FC = () => {
  const path = useRouterState().location.pathname;
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const { id }: { id: number } = useParams({ strict: false });

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

  const theme = createTheme({
    primaryColor: "blue",
    fontFamily: "Inter, sans-serif",
  });

  return (
    <MantineProvider theme={theme} defaultColorScheme="dark">
      <AppShell
        padding="md"
        header={{ height: 60 }}
        navbar={{
          width: 300,
          breakpoint: "sm",
          collapsed: { mobile: !mobileOpened },
        }}
      >
        <Navbar toggleMobile={toggleMobile} />
        <AppShell.Navbar>
          <Sidebar id={id} />
        </AppShell.Navbar>
        <AppShell.Main>
          <Outlet />
        </AppShell.Main>
      </AppShell>
    </MantineProvider>
  );
};

export const Route = createRootRouteWithContext<{
  router: unknown;
}>()({
  component: RootPage,
});
