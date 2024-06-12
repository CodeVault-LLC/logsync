import { Outlet, createFileRoute } from "@tanstack/react-router";
import { ProtectedDisplay } from "../components/ProtectedDisplay";
import { Box } from "@mantine/core";

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
