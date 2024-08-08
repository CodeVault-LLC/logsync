import classes from "../styles/navbar_nested.module.css";
import { IconGauge, IconNotes } from "@tabler/icons-react";
import { LinksGroup } from "./LinksGroup";
import { Code, Group, Indicator, ScrollArea } from "@mantine/core";
import pkg from "../../package.json";

type SidebarProps = {
  id: number;
};

type Mockdata = {
  divider?: boolean;
  label?: string;
  icon?: React.FC;
  initialLink?: string;
  links?: { label: string; link: string }[];
};

export const Sidebar: React.FC<SidebarProps> = ({ id }) => {
  const mockdata: Mockdata[] = [
    { label: "Dashboard", icon: IconGauge, initialLink: "/" },
    {
      label: "Monitors",
      icon: IconNotes,
      initialLink: "/monitors",
    },
  ];

  id
    ? mockdata.push(
        {
          divider: true,
        },
        {
          label: "Monitor",
          icon: IconNotes,
          initialLink: `/monitors/${id}`,
        },
        {
          label: "Logs",
          icon: IconNotes,
          initialLink: `/monitors/${id}/logs`,
        },
        {
          label: "Settings",
          icon: IconNotes,
          initialLink: `/monitors/${id}/settings`,
        }
      )
    : null;

  const links = mockdata.map((item) => (
    <LinksGroup {...item} key={item.label} />
  ));

  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>{links}</div>
      </ScrollArea>

      <div className={classes.header}>
        <Group justify="right">
          <Group align="center" gap="sm">
            <Indicator color="green" processing />
            <Code fw={700}>v{pkg.version}</Code>
          </Group>
        </Group>
      </div>
    </nav>
  );
};
