import { Link } from "@tanstack/react-router";
import { useCurrentUser } from "../hooks/useUser";
import { Button, ButtonGroup, Container, Loader, Text } from "@mantine/core";

type ProtectedDisplayProps = {
  children: React.ReactNode;
};

export const ProtectedDisplay: React.FC<ProtectedDisplayProps> = ({
  children,
}) => {
  const { data, isLoading } = useCurrentUser();

  if (isLoading) {
    return <Loader />;
  }

  if (!data && !isLoading) {
    return (
      <Container size={420} my={40}>
        <Text size="lg">You must be logged in to view this page.</Text>
        <Text size="sm">
          If you believe this is an error, please contact an administrator.
        </Text>

        <ButtonGroup>
          <Link to="/">
            <Button>Go to Homepage</Button>
          </Link>

          <Link to="/login">
            <Button>Sign In</Button>
          </Link>
        </ButtonGroup>
      </Container>
    );
  }
  return <div>{children}</div>;
};
