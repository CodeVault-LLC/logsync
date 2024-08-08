import { Alert, Box } from "@mantine/core";

export const NotAuthenticated: React.FC = () => {
  return (
    <Box>
      <Alert title="You are not authenticated" color="red" />

      <Alert
        title="You must be authenticated to view this page"
        color="red"
        style={{ marginTop: 10 }}
      />
    </Box>
  );
};
