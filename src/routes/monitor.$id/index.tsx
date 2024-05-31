import { createFileRoute, useParams } from "@tanstack/react-router";
import { useProjectStatistics } from "../../hooks/useMonitor";
import { Box, Grid, LinearProgress, Paper, Typography } from "@mui/material";
import { MonitorStatistics } from "../../components/Statistics/MonitorStatistics";
import { useMemo } from "react";

const MonitorId = () => {
  const { id }: { id: number } = useParams({ strict: false });

  const { data, isLoading } = useProjectStatistics(id);

  const chartData: Highcharts.SeriesOptionsType[] = useMemo(() => {
    if (!data) return [];

    return [
      {
        name: "Error",
        type: "line",
        data: data.map((stat) => stat.Error),
      },
      {
        name: "Info",
        type: "line",
        data: data.map((stat) => stat.Info),
      },
      {
        name: "Debug",
        type: "line",
        data: data.map((stat) => stat.Debug),
      },
    ];
  }, [data]);

  const dates = useMemo(() => {
    if (!data) return [];

    return data.map((stat) => stat.Date);
  }, [data]);

  const Data = [
    {
      name: "Total Usage",
      value: "158K logs",
    },
    {
      name: "Total Usage",
      value: "158K logs",
    },
    {
      name: "Total Usage",
      value: "158K logs",
    },
    {
      name: "Total Usage",
      value: "158K logs",
    },
  ];

  return (
    <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid container spacing={3}>
        {Data.map((data) => (
          <Grid item xs={12} md={6} lg={3}>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 120,
                width: "100%",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Typography variant="body1">{data.name}</Typography>
              <Typography variant="h4">{data.value}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {isLoading && <LinearProgress />}
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 320,
              width: "100%",
            }}
          >
            <MonitorStatistics data={chartData} dates={dates} />
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper
            sx={{ p: 2, display: "flex", flexDirection: "column" }}
          ></Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export const Route = createFileRoute("/monitor/$id/")({
  component: MonitorId,
});
