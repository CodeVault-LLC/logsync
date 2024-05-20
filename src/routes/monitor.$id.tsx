import { Outlet, createFileRoute } from "@tanstack/react-router";
import { Box, Input } from "@mui/material";
import { useState } from "react";
import { Search } from "@mui/icons-material";
import { ProtectedDisplay } from "../components/ProtectedDisplay";

const Monitor = () => {
  const [search, setSearch] = useState("");

  return (
    <ProtectedDisplay>
      <Box>
        <Input
          startAdornment={<Search />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search"
          fullWidth
          sx={{ mb: 2 }}
        />

        <Outlet />
      </Box>
    </ProtectedDisplay>
  );
};

export const Route = createFileRoute("/monitor/$id")({
  component: Monitor,
});
