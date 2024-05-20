import { Email, Home, Lock } from "@mui/icons-material";
import { Box, Button, LinearProgress, Typography } from "@mui/material";
import { Link } from "@tanstack/react-router";
import { useCurrentUser } from "../hooks/useUser";

type ProtectedDisplayProps = {
  children: React.ReactNode;
};

export const ProtectedDisplay: React.FC<ProtectedDisplayProps> = ({
  children,
}) => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <LinearProgress />;
  }

  if (!data && !isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",

          padding: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Lock sx={{ fontSize: 60, color: "red" }} />
        <Typography variant="h2" sx={{ marginBottom: 2 }}>
          Access Denied
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 4, textAlign: "center" }}>
          You must be logged in to view this page.
          <br />
          If something has gone wrong, please contact an administrator.
        </Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <a href="/mailto:admin@example.com">
            <Button variant="contained" color="primary" startIcon={<Email />}>
              Contact Admin
            </Button>
          </a>
          <Link to="/">
            <Button variant="outlined" color="secondary" startIcon={<Home />}>
              Go to Homepage
            </Button>
          </Link>
        </Box>
      </Box>
    );
  }
  return <div>{children}</div>;
};
