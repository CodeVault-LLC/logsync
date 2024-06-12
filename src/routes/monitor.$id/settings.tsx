import { Divider, Flex, Tabs } from "@mantine/core";
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
    <Flex gap="md">
      <Tabs
        orientation="vertical"
        variant="pills"
        defaultValue={location.pathname}
      >
        <Tabs.List>
          {tabs.map((tab, index) => (
            <>
              {tab.type === "link" ? (
                <Tabs.Tab key={index} value={tab.link}>
                  <Link
                    to={tab.link}
                    value={tab.title}
                    style={{
                      color: "inherit",
                      textDecoration: "none",
                    }}
                  >
                    {tab.title}
                  </Link>
                </Tabs.Tab>
              ) : (
                <Divider key={index} />
              )}
            </>
          ))}
        </Tabs.List>
      </Tabs>
      <div
        style={{
          height: "100%",
          width: "100%",
        }}
      >
        <Outlet />
      </div>
    </Flex>
  );
};

export const Route = createFileRoute("/monitor/$id/settings")({
  component: MonitorAuthentication,
});
