import { Link, createFileRoute } from "@tanstack/react-router";
import { useLogin } from "../hooks/useUser";
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
  Container,
  Group,
  Loader,
} from "@mantine/core";
import classes from "../styles/login.module.css";
import { useState } from "react";

export default function SignIn() {
  const [schema, setSchema] = useState({ username: "", password: "" });
  const { mutate, isPending } = useLogin();

  const handleSubmit = () => {
    if (schema.username && schema.password) {
      mutate({ username: schema.username, password: schema.password });
    } else {
      console.error("Both fields are required");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Container size={420} my={40}>
      <Title ta="center" className={classes.title}>
        Welcome back!
      </Title>
      <Text c="dimmed" size="sm" ta="center" mt={5}>
        Do not have an account yet?{" "}
        <Link
          to="/register"
          style={{
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Anchor size="sm" component="button">
            Create account
          </Anchor>
        </Link>
      </Text>

      <Paper
        withBorder
        shadow="md"
        p={30}
        mt={30}
        radius="md"
        onKeyDown={handleKeyDown}
      >
        <TextInput
          label="Username"
          placeholder="username"
          required
          value={schema.username}
          onChange={(e) =>
            setSchema({ ...schema, username: e.currentTarget.value })
          }
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          value={schema.password}
          onChange={(e) =>
            setSchema({ ...schema, password: e.currentTarget.value })
          }
        />
        <Group justify="space-between" mt="lg">
          <Checkbox label="Remember me" />
          <Anchor component="button" size="sm">
            Forgot password?
          </Anchor>
        </Group>
        <Button
          fullWidth
          mt="xl"
          size="md"
          onClick={handleSubmit}
          disabled={isPending}
        >
          {isPending ? <Loader size={"sm"} /> : "Sign in"}
        </Button>
      </Paper>
    </Container>
  );
}

export const Route = createFileRoute("/login")({
  component: SignIn,
});
