import {
  Badge,
  Button,
  Card,
  Flex,
  Group,
  MantineColor,
  Text,
} from "@mantine/core";
import { IconNotebook, IconShare } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

const StatusBadge = ({ status }: { status: string }) => {
  let color: MantineColor;

  switch (status) {
    case "expired":
      color = "dark";
      break;
    case "active":
      color = "green";
      break;
    case "cancelled":
      color = "gray";
      break;
    case "archived":
      color = "gray";
      break;
    case "inactive":
      color = "dark";
      break;
    case "completed":
      color = "green";
      break;
    case "in progress":
      color = "indigo";
      break;
    case "pending":
      color = "yellow.8";
      break;
    case "suspended":
      color = "red";
      break;
    case "on hold":
      color = "pink";
      break;
    default:
      color = "gray";
  }

  return (
    <Badge color={color} variant="filled" radius="sm">
      {status}
    </Badge>
  );
};

type ProjectCardProps = {
  id: number;
  title: string;
  description: string;
  image?: string;
  status: "active" | "inactive";
};

export const ProjectCard: React.FC<ProjectCardProps> = ({
  id,
  description,
  status,
  title,
}) => {
  return (
    <Card shadow="xs" padding="md" radius="sm">
      <Flex justify="space-between" gap={2}>
        <Text fz="lg" fw={600} style={{ marginBottom: 10 }}>
          {title}
        </Text>
        <StatusBadge status={status} />
      </Flex>
      <Text fz="sm" style={{ marginBottom: 10, minHeight: "5rem" }}>
        {description}
      </Text>

      <Flex justify="space-between" align="center">
        <Group gap="xs">
          <Link to="/monitor/$id" params={{ id: id.toString() }}>
            <Button
              variant="outline"
              color="blue"
              leftSection={<IconNotebook />}
            >
              Details
            </Button>
          </Link>
          <Button variant="outline" color="blue" leftSection={<IconShare />}>
            Share
          </Button>
        </Group>
      </Flex>
    </Card>
  );
};
