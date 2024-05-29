import { Add, MoreVert, OpenInFull, Save, Share } from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Chip,
  Divider,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from "@mui/material";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useFavoriteProject, useProjects } from "../hooks/useMonitor";
import { ProtectedDisplay } from "../components/ProtectedDisplay";
import { CreateProject } from "../components/Monitors/CreateProject";
import { formatMonitorDate } from "../lib/data";

const Monitors = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const [createNew, setCreateNew] = useState(false);
  const [selectedMonitor, setSelectedMonitor] = useState<number | null>(null);

  const { mutate: favorite } = useFavoriteProject(selectedMonitor as number);

  const { data } = useProjects();

  return (
    <ProtectedDisplay>
      <Box>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Typography variant="h4">Monitors</Typography>
          </Grid>

          <Grid
            item
            xs={8}
            sx={{ display: "flex", justifyContent: "flex-end" }}
          >
            <IconButton onClick={() => setCreateNew(true)}>
              <Add />
            </IconButton>
          </Grid>
        </Grid>
      </Box>

      <CreateProject createNew={createNew} setCreateNew={setCreateNew} />
      <Divider sx={{ my: 2 }} />

      <Grid container spacing={3}>
        {data && data.length === 0 && (
          <Grid item xs={12}>
            <Alert severity="info">No monitors found</Alert>
          </Grid>
        )}

        {data &&
          data.length > 0 &&
          data.map((monitor) => (
            <Grid item xs={12} md={6} lg={4} key={monitor.ID}>
              <Card
                sx={{
                  position: "relative",
                }}
              >
                <CardHeader
                  title={monitor.Name}
                  avatar={
                    <Avatar aria-label="recipe">{monitor.Name[0]}</Avatar>
                  }
                  action={
                    <>
                      <Tooltip title="Options button">
                        <IconButton
                          onClick={handleClick}
                          size="small"
                          sx={{ ml: 2 }}
                          aria-controls={open ? "options-menu" : undefined}
                          aria-haspopup="true"
                          aria-expanded={open ? "true" : undefined}
                        >
                          <MoreVert />
                        </IconButton>
                      </Tooltip>

                      <Menu
                        anchorEl={anchorEl}
                        id="account-menu"
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&::before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <MenuItem>Delete</MenuItem>
                        <MenuItem>Edit</MenuItem>
                      </Menu>
                    </>
                  }
                  subheader={formatMonitorDate(monitor.CreatedAt)}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    {monitor.Description}
                  </Typography>
                </CardContent>

                <Box>
                  {["TAG 1", "TAG 2"].map((tag) => (
                    <Chip key={tag} sx={{ mx: 1 }} label={tag} />
                  ))}
                </Box>

                <CardActions
                  disableSpacing
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: 2,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Link
                      to="/monitor/$id"
                      params={{ id: monitor.ID.toString() }}
                    >
                      <IconButton aria-label="open">
                        <OpenInFull />
                      </IconButton>
                    </Link>

                    <Tooltip title="Save">
                      <IconButton
                        aria-label="Save"
                        style={{
                          color: monitor.Favorited ? "#f50057" : "inherit",
                        }}
                        onClick={() => {
                          setSelectedMonitor(monitor.ID);
                          favorite();
                        }}
                      >
                        <Save />
                      </IconButton>
                    </Tooltip>
                  </Box>

                  <Tooltip title="Share">
                    <IconButton>
                      <Share />
                    </IconButton>
                  </Tooltip>
                </CardActions>
              </Card>
            </Grid>
          ))}
      </Grid>
    </ProtectedDisplay>
  );
};

export const Route = createFileRoute("/monitors")({
  component: Monitors,
});
