import { createFileRoute, useParams } from "@tanstack/react-router";
import { Code, CopyBlock, nord } from "react-code-blocks";
import { useMonitorKey } from "../../../hooks/useMonitor";
import { Box, Button, Grid, Loader, Text } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";

const MonitorSettingsAuthentication = () => {
  const { id }: { id: number } = useParams({ strict: false });

  const { mutate, data, isPending } = useMonitorKey(id);

  const code = `fetch("https://localhost:8080/logs", {
    headers: {
      method: "POST",
      "Content-Type": "application/json",

      "Monitor-Key": "${data ? data.key : "YOUR_API_KEY"}",
    }
});`;

  return (
      <Grid>
        <Grid.Col span={4}>
          <Box style={{ gap: 1, display: "flex", flexDirection: "column" }}>
            <Text size="xl">Authentication</Text>
            {isPending && <Loader />}
            {data && data?.key ? (
              <Code text={`${data.key}`} language="text" theme={nord} />
            ) : (
              <Button
                variant="contained"
                color="primary"
                onClick={() => mutate()}
              >
                <IconPlus /> Show API Key
              </Button>
            )}

            <Text variant="h5">Example Usage</Text>
            <CopyBlock
              text={code}
              language="javascript"
              theme={nord}
              showLineNumbers={false}
            />
          </Box>
        </Grid.Col>
      </Grid>
  );
};

export const Route = createFileRoute("/monitor/$id/settings/authentication")({
  component: MonitorSettingsAuthentication,
});
