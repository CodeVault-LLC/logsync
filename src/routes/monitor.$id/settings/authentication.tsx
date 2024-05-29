import { createFileRoute, useParams } from "@tanstack/react-router";
import { Code, CopyBlock, nord } from "react-code-blocks";
import { useMonitorKey } from "../../../hooks/useMonitor";
import { Add } from "@mui/icons-material";
import { Button, Grid, Typography, Box, LinearProgress } from "@mui/material";

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
    <Grid container spacing={3}>
      {/* Authentication */}
      <Grid item xs={12} md={8} lg={9}>
        <Box sx={{ gap: 1, display: "flex", flexDirection: "column" }}>
          <Typography variant="h5">API Key</Typography>
          {isPending && <LinearProgress />}
          {data && data?.key ? (
            <Code text={`${data.key}`} language="text" theme={nord} />
          ) : (
            <Button
              variant="contained"
              color="primary"
              onClick={() => mutate()}
            >
              <Add /> Show API Key
            </Button>
          )}

          <Typography variant="h5">Example Usage</Typography>
          <CopyBlock
            text={code}
            language="javascript"
            theme={nord}
            showLineNumbers={false}
          />
        </Box>
      </Grid>
    </Grid>
  );
};

export const Route = createFileRoute("/monitor/$id/settings/authentication")({
  component: MonitorSettingsAuthentication,
});
