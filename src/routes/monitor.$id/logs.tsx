import { Link, createFileRoute, useParams } from "@tanstack/react-router";
import React, { useMemo, useState } from "react";
import { formatDate } from "../../lib/data";
import { Log } from "../../types/log";
import { CopyBlock, nord } from "react-code-blocks";
import { useCurrentUser } from "../../hooks/useUser";
import { CommentField } from "../../components/CommentSection/CommentField";
import { LogsFilter } from "../../components/Logs/LogFilter";
import { findStatusPalette } from "../../packages/status";
import {
  ActionIcon,
  ActionIconGroup,
  Badge,
  Box,
  Drawer,
  Flex,
  Grid,
  Paper,
  Text,
  Tooltip,
} from "@mantine/core";
import {
  IconDownload,
  IconFlagSearch,
  IconGraph,
  IconSearch,
} from "@tabler/icons-react";
import {
  MRT_ColumnDef,
  MantineReactTable,
  useMantineReactTable,
} from "mantine-react-table";

const Logs: React.FC = () => {
  const { id }: { id: number } = useParams({ strict: false });
  const [clickedRow, setClickedRow] = useState<Log | null>(null);
  const [logs, setLogs] = useState<Log[]>([]);

  const { data: user } = useCurrentUser();

  const columns = useMemo<MRT_ColumnDef<Log>[]>(
    () => [
      {
        accessorKey: "createdAt",
        header: "CreatedAt",
        Cell: ({ renderedCellValue, row }) => {
          return (
            <Box
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 1,
                alignItems: "center",
              }}
            >
              <div
                style={{
                  width: 4,
                  height: 20,
                  borderRadius: 5,
                  backgroundColor: findStatusPalette(row.original.level)
                    .background,
                }}
              />
              <span>{formatDate(renderedCellValue?.toString() || "")}</span>
            </Box>
          );
        },

        enableHiding: true,
        enableSorting: true,
      },
      {
        accessorKey: "message",
        header: "Message",

        enableHiding: true,
        enableSorting: true,
      },
    ],
    []
  );

  const table = useMantineReactTable({
    columns,
    data: logs, //must be memoized or stable (useState, useMemo, defined outside of this component, etc.)

    // on row click, set the clicked row to the row data
    enableRowActions: true,
    renderRowActions: ({ row }) => (
      <Flex style={{ display: "flex", flexWrap: "nowrap", gap: "8px" }}>
        <Tooltip label="View log">
          <ActionIcon
            onClick={() => setClickedRow(row.original)}
            variant="light"
          >
            <IconFlagSearch />
          </ActionIcon>
        </Tooltip>
      </Flex>
    ),
    enableColumnOrdering: true, //enable a feature for all columns
    enableGlobalFilter: false, //turn off a feature
  });

  return (
    <Box>
      <>
        <LogsFilter monitorId={id} setLogs={setLogs} />

        <Box
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
            gap: 4,
          }}
        >
          <Paper style={{ padding: 2, flex: 1 }}>
            <MantineReactTable table={table} />
          </Paper>

          <Drawer
            onClose={() => setClickedRow(null)}
            opened={Boolean(clickedRow)}
            position="right"
            size="xl"
            title={`Log Details - ${clickedRow?.id || ""}`}
          >
            <Box style={{ width: "100%", padding: 2 }}>
              <Box
                style={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Flex gap="lg" justify="center" align="center">
                  <Badge
                    variant="filled"
                    radius="sm"
                    size="md"
                    style={{
                      color: findStatusPalette(clickedRow?.level ?? "").text,
                      backgroundColor: findStatusPalette(
                        clickedRow?.level ?? ""
                      ).background,
                    }}
                  >
                    {clickedRow?.level?.toUpperCase() || "N/A"}
                  </Badge>

                  <Text variant="body1">
                    {formatDate(clickedRow?.createdAt || "")}
                  </Text>
                </Flex>

                <Flex gap="sm" justify="center" align="center">
                  <ActionIconGroup variant="filled">
                    <Tooltip label="Export log">
                      <ActionIcon size="lg" color="primary" variant="light">
                        <IconDownload />
                      </ActionIcon>
                    </Tooltip>
                  </ActionIconGroup>
                </Flex>
              </Box>

              <Grid my="md">
                <Grid.Col span={6}>
                  <Text variant="text" size="lg">
                    SOURCE
                  </Text>
                  <Text variant="text">
                    {clickedRow?.logInformation?.source || "N/A"}
                  </Text>
                </Grid.Col>

                <Grid.Col span={6}>
                  <Text variant="text" size="lg">
                    FUNCTION
                  </Text>
                  <Text variant="text">
                    {clickedRow?.logInformation?.function || "N/A"}
                  </Text>
                </Grid.Col>
              </Grid>

              <Box my="md">
                <CopyBlock
                  text={clickedRow?.logInformation?.stackTrace || "N/A"}
                  theme={nord}
                  codeBlock
                  language={"text"}
                  showLineNumbers={false}
                />
              </Box>

              {clickedRow?.logInformation?.solution && (
                <Box my="md">
                  <Text variant="text" size="lg">
                    Solution
                  </Text>
                  <Text variant="text">
                    {clickedRow?.logInformation?.solution}
                  </Text>
                </Box>
              )}

              <Box my="md">
                <Text variant="text" size="lg">
                  Error Kind
                </Text>

                <Flex gap="xl" align="center">
                  <Link
                    href="https://google.com"
                    target="_blank"
                    style={{
                      textDecoration: "none",
                    }}
                  >
                    {clickedRow?.logInformation?.errorType}
                  </Link>

                  <ActionIconGroup>
                    <Tooltip label="Search">
                      <ActionIcon variant="light">
                        <IconSearch />
                      </ActionIcon>
                    </Tooltip>
                    <Tooltip label="Similar logs">
                      <ActionIcon variant="light">
                        <IconGraph />
                      </ActionIcon>
                    </Tooltip>
                  </ActionIconGroup>
                </Flex>
              </Box>

              <Box mt="xl">
                <CommentField
                  Username={user?.username || ""}
                  LogID={clickedRow?.id?.toString() || ""}
                  Comments={clickedRow?.comments || []}
                />
              </Box>
            </Box>
          </Drawer>
        </Box>
      </>
    </Box>
  );
};

export const Route = createFileRoute("/monitor/$id/logs")({
  component: Logs,
});
