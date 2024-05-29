import { Settings } from "@mui/icons-material";
import { Divider, Grid, Tab, Tabs, Box } from "@mui/material";
import {
  Link,
  Outlet,
  createFileRoute,
  useParams,
  useLocation,
} from "@tanstack/react-router";

const MonitorAuthentication = () => {
  const { id }: { id: string } = useParams({ strict: false });
  const location = useLocation();

  const tabs = [
    {
      title: "General",
      link: `/monitor/${id}/settings/general`,
      type: "link",
    },
    {
      title: "Authentication",
      link: `/monitor/${id}/settings/authentication`,
      type: "link",
    },
    {
      title: "Notifications",
      link: `/monitor/${id}/settings/notifications`,
      type: "link",
    },
    {
      title: "Integrations",
      link: `/monitor/${id}/settings/integrations`,
      type: "link",
    },
    {
      title: "Advanced",
      link: `/monitor/${id}/settings/advanced`,
      type: "link",
    },
  ];

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Box sx={{ borderRight: 1, borderColor: "divider" }}>
          <Tabs
            orientation="vertical"
            variant="scrollable"
            value={location.pathname}
            sx={{
              "& .MuiTab-root": {
                color: "white",
                textAlign: "left",
                justifyContent: "flex-start",
                padding: "10px 20px",
              },
            }}
          >
            {tabs.map((tab, index) => (
              <>
                {tab.type === "link" ? (
                  <Tab
                    key={index}
                    label={tab.title}
                    component={Link}
                    to={tab.link}
                    value={tab.link}
                    icon={<Settings />}
                    iconPosition="start"
                    sx={{ textTransform: "none", color: "white" }}
                  />
                ) : (
                  <Divider key={index} />
                )}
              </>
            ))}
          </Tabs>
        </Box>
      </Grid>

      <Grid item xs={12} md={9}>
        <Outlet />
      </Grid>
    </Grid>
  );
};

export const Route = createFileRoute("/monitor/$id/settings")({
  component: MonitorAuthentication,
});
