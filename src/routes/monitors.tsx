import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useProjects } from "../hooks/useMonitor";
import { ProtectedDisplay } from "../components/ProtectedDisplay";
import { CreateProject } from "../components/Monitors/CreateProject";
import { Alert, Box, Button, Divider, Flex, Grid, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { ProjectCard } from "../components/ProjectCard";

const Monitors = () => {
  const [createNew, setCreateNew] = useState(false);
  const { data } = useProjects();

  return (
    <ProtectedDisplay>
      <Flex my={2} justify="space-between">
        <Text size="xl">Monitors</Text>

        <Button
          title="Create a new monitor"
          onClick={() => setCreateNew(true)}
          variant="outline"
        >
          <IconPlus />
        </Button>
      </Flex>

      <CreateProject createNew={createNew} setCreateNew={setCreateNew} />
      <Divider mt="lg" mb="lg" />

      <Box my={2}>
        {data && data.length === 0 && (
          <Alert variant="default">No monitors found</Alert>
        )}

        <Grid>
          {data &&
            data.length > 0 &&
            data.map((monitor) => (
              <Grid.Col span={4}>
                <ProjectCard
                  id={monitor.id}
                  description={monitor.description}
                  status={"active"}
                  title={monitor.name}
                />
              </Grid.Col>
            ))}
        </Grid>
      </Box>
    </ProtectedDisplay>
  );
};

export const Route = createFileRoute("/monitors")({
  component: Monitors,
});
