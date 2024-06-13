import { createFileRoute, useParams } from "@tanstack/react-router";
import { useProjectStatistics } from "../../hooks/useMonitor";
import { MonitorStatistics } from "../../components/Statistics/MonitorStatistics";
import { useMemo } from "react";
import { Box, Card, Grid, Loader, Paper, Text } from "@mantine/core";

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
    <Box style={{ display: "flex", flexDirection: "column", gap: 2 }}>
      <Grid>
        {Data.map((data) => (
          <Grid.Col span={3}>
            <Card
              style={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 120,
                width: "100%",
                justifyContent: "space-between",
                alignContent: "center",
              }}
            >
              <Text variant="text">{data.name}</Text>
              <Text variant="text" size="xl">
                {data.value}
              </Text>
            </Card>
          </Grid.Col>
        ))}
      </Grid>

      <Grid>
        {isLoading && <Loader />}
        {/* Chart */}
        <Grid.Col span={12}>
          <Paper
            style={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 320,
              width: "100%",
            }}
          >
            <MonitorStatistics data={chartData} dates={dates} />
          </Paper>
        </Grid.Col>
        {/* Recent Deposits */}
        <Grid.Col span={6}>
          <Paper
            style={{
              p: 2,
              display: "flex",
              flexDirection: "column",
              height: 240,
            }}
          ></Paper>
        </Grid.Col>
      </Grid>
    </Box>
  );
};

export const Route = createFileRoute("/monitor/$id/")({
  component: MonitorId,
});
