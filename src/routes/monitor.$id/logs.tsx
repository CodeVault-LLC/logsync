import {
  Box,
  ButtonGroup,
  Chip,
  Drawer,
  Grid,
  IconButton,
  LinearProgress,
  Link,
  Paper,
  Tab,
  Tabs,
  Tooltip,
  Typography,
} from "@mui/material";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import { useLogs } from "../../hooks/useLog";
import { formatDate } from "../../lib/data";
import { Log } from "../../types/log";
import { Close, Download, GraphicEq, Search } from "@mui/icons-material";
import { CopyBlock, nord } from "react-code-blocks";
import { useCurrentUser } from "../../hooks/useUser";
import { CommentField } from "../../components/CommentSection/CommentField";

const Logs: React.FC = () => {
  const { id }: { id: number } = useParams({ strict: false });
  const [tab, setTab] = useState("filters");
  const [clickedRow, setClickedRow] = useState({} as Log);

  const { data, isLoading } = useLogs(id);
  const { data: user } = useCurrentUser();

  const findLevelColor = (level: string) => {
    switch (level) {
      case "error":
        return "#FF3838";
      case "info":
        return "#2DCCFF";
      case "debug":
        return "#A4ABB6";
      case "warn":
        return "#FFB302";
      case "fatal":
        return "purple";
      default:
        return "#A4ABB6";
    }
  };

  return (
    <Box>
      {isLoading && <LinearProgress />}

      {!isLoading && (
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 2,
            gap: 4,
          }}
        >
          <Paper sx={{ padding: 2 }}>
            <Tabs
              value={tab}
              onChange={(e, value) => setTab(value)}
              aria-label="monitor logs tabs"
              defaultValue={"filters"}
            >
              <Tab label="Filters" id="filters" defaultChecked />
              <Tab label="Saved Views" id="saved-views" />
            </Tabs>

            {tab === "filters" && (
              <Box sx={{ display: "flex", flexDirection: "column" }}></Box>
            )}
          </Paper>

          <Paper sx={{ padding: 2, flex: 1 }}>
            <DataGrid
              getRowId={(row) => row.ID.toString()}
              onRowClick={(row) => {
                setClickedRow(row.row as Log);
              }}
              rows={data}
              columns={[
                {
                  field: "CreatedAt",
                  headerName: "Date",
                  width: 200,
                  renderCell(params) {
                    return (
                      <Box
                        sx={{
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
                            backgroundColor: findLevelColor(params.row.Level),
                          }}
                        />
                        <span>{formatDate(params.value)}</span>
                      </Box>
                    );
                  },
                },
                { field: "Message", headerName: "Message", width: 150 },
              ]}
              pageSizeOptions={[10, 50, 100]}
              checkboxSelection={false}
              disableRowSelectionOnClick={true}
              rowHeight={38}
            />
          </Paper>

          <Drawer
            anchor="right"
            ModalProps={{
              keepMounted: true,
            }}
            open={Boolean(clickedRow && Object.keys(clickedRow).length > 0)}
            onClose={() => setClickedRow({} as Log)}
            sx={{ zIndex: 1475 }}
          >
            <Box sx={{ width: 800, padding: 2 }}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  gap: 2,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Chip
                    label={clickedRow.Level?.toUpperCase()}
                    variant="filled"
                    sx={{
                      borderRadius: 0.5,
                      backgroundColor: findLevelColor(clickedRow.Level),
                    }}
                  />

                  <Typography variant="body1">
                    {formatDate(clickedRow.CreatedAt)}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Tooltip title="Export log" arrow>
                    <IconButton color="primary">
                      <Download />
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Close" arrow>
                    <IconButton onClick={() => setClickedRow({} as Log)}>
                      <Close />
                    </IconButton>
                  </Tooltip>
                </Box>
              </Box>

              <Grid container>
                <Grid item xs={6}>
                  <Typography variant="body1">SOURCE</Typography>
                  <Typography variant="body2">
                    {clickedRow.LogInformation?.Source || "N/A"}
                  </Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant="body1">FUNCTION</Typography>
                  <Typography variant="body2">
                    {clickedRow.LogInformation?.Function || "N/A"}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ marginTop: 2 }}>
                {/* make the message in a code block format */}
                {clickedRow.Message}
              </Box>

              <Box sx={{ marginTop: 2 }}>
                <CopyBlock
                  text={clickedRow.LogInformation?.StackTrace || "N/A"}
                  theme={nord}
                  codeBlock
                  language={"text"}
                  showLineNumbers={false}
                />
              </Box>

              {clickedRow.LogInformation?.Solution && (
                <Box sx={{ marginTop: 2 }}>
                  <Typography variant="h6">Solution</Typography>
                  <Typography variant="body1">
                    {clickedRow.LogInformation?.Solution}
                  </Typography>
                </Box>
              )}

              <Box sx={{ marginTop: 2 }}>
                <Typography variant="h6">Error Kind</Typography>

                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 2,
                    alignItems: "center",
                  }}
                >
                  <Link href="https://google.com" target="_blank">
                    {clickedRow.LogInformation?.ErrorType}
                  </Link>

                  <ButtonGroup>
                    <Tooltip title="Search" arrow>
                      <IconButton>
                        <Search />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Similar logs" arrow>
                      <IconButton>
                        <GraphicEq />
                      </IconButton>
                    </Tooltip>
                  </ButtonGroup>
                </Box>
              </Box>

              <Box sx={{ marginTop: 4 }}>
                <CommentField
                  Username={user?.Username || ""}
                  LogID={clickedRow?.ID?.toString()}
                  Comments={clickedRow?.Comments || []}
                />
              </Box>
            </Box>
          </Drawer>
        </Box>
      )}
    </Box>
  );
};

export const Route = createFileRoute("/monitor/$id/logs")({
  component: Logs,
});
