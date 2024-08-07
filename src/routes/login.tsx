import { Link, createFileRoute } from "@tanstack/react-router";
import { useLogin } from "../hooks/useUser";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
  Notification,
} from "@mantine/core";
import classes from "../styles/login.module.css";
import { loginSchema } from "../schemas/user";
import { z } from "zod";

export default function SignIn() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
  });

  const { mutate, isPending, isError, reset } = useLogin();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      handleSubmit((data) => {
        mutate(data);
      })();
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
        {isError && (
          <Notification
            title="Invalid credentials"
            color="red"
            withCloseButton
            onClose={() => {
              reset();
            }}
            mb={8}
          >
            <Text size="sm">
              The username or password you provided is incorrect
            </Text>
          </Notification>
        )}

        <TextInput
          label="Username"
          placeholder="username"
          required
          {...register("username")}
          error={errors.username?.message}
        />

        <PasswordInput
          label="Password"
          placeholder="Your password"
          required
          mt="md"
          {...register("password")}
          error={errors.password?.message}
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
          onClick={handleSubmit((data) => {
            mutate(data);
          })}
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
