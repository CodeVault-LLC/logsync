import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Box } from "@mui/material";
import { ProtectedDisplay } from "../components/ProtectedDisplay";

const Monitor = () => {
  return (
    <ProtectedDisplay>
      <Box>
        <Outlet />
      </Box>
    </ProtectedDisplay>
  );
};

export const Route = createFileRoute("/monitor/$id")({
  component: Monitor,
});
