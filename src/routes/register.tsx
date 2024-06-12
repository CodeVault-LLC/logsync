import { Link, createFileRoute } from "@tanstack/react-router";
import {
  Paper,
  TextInput,
  PasswordInput,
  Checkbox,
  Button,
  Title,
  Text,
  Anchor,
} from "@mantine/core";
import classes from "../styles/login.module.css";
import { useRegister } from "../hooks/useUser";
import { useState } from "react";

export default function Register() {
  const [schema, setSchema] = useState(
    {} as { username: string; password: string; email: string }
  );
  const { mutate } = useRegister(
    schema.username,
    schema.password,
    schema.email
  );

  return (
    <div className={classes.wrapper}>
      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Register new account today!
        </Title>

        <TextInput
          label="Username"
          placeholder="luckyluke"
          size="md"
          mb="md"
          value={schema.username}
          onChange={(e) =>
            setSchema({ ...schema, username: e.currentTarget.value })
          }
        />

        <TextInput
          label="Email address"
          placeholder="you@codevault.com"
          size="md"
          value={schema.email}
          onChange={(e) =>
            setSchema({ ...schema, email: e.currentTarget.value })
          }
        />
        <PasswordInput
          label="Password"
          placeholder="Your password"
          mt="md"
          size="md"
          value={schema.password}
          onChange={(e) => {
            setSchema({ ...schema, password: e.currentTarget.value });
          }}
        />
        <Checkbox label="Keep me logged in" mt="xl" size="md" />
        <Button fullWidth mt="xl" size="md" onClick={() => mutate()}>
          Register
        </Button>

        <Text ta="center" mt="md">
          Already have an account?{" "}
          <Link
            to="/login"
            style={{
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <Anchor size="sm" component="button">
              Sign in
            </Anchor>
          </Link>
        </Text>
      </Paper>
    </div>
  );
}

export const Route = createFileRoute("/register")({
  component: Register,
});
