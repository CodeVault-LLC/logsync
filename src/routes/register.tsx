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
  Loader,
  Notification,
} from "@mantine/core";
import { useState } from "react";
import { useRegister } from "../hooks/useUser";
import { registerSchema } from "../schemas/user";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import classes from "../styles/login.module.css";

export default function Register() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  const [avatar, setAvatar] = useState<File | null>(null);
  const { mutate, isPending, isError, reset } = useRegister();

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAvatar(file);
    }
  };

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    const formData = new FormData();
    formData.append("username", data.username);
    formData.append("password", data.password);
    formData.append("email", data.email);
    if (avatar) {
      formData.append("avatar", avatar);
    } else {
      console.error("Avatar is required");
      return;
    }

    mutate(formData);
  };

  return (
    <div className={classes.wrapper}>
      {isError && (
        <Notification
          title="Registration Error"
          color="red"
          withCloseButton
          onClose={() => reset()}
          mb={8}
        >
          <Text size="sm">An error occurred during registration</Text>
        </Notification>
      )}

      <Paper className={classes.form} radius={0} p={30}>
        <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
          Register new account today!
        </Title>

        <form onSubmit={handleSubmit(onSubmit)} {...register}>
          <TextInput
            label="Username"
            placeholder="luckyluke"
            size="md"
            mb="md"
            required
            {...register("username")}
            error={errors.username?.message}
          />

          <TextInput
            label="Email address"
            placeholder="you@codevault.com"
            size="md"
            mb="md"
            required
            {...register("email")}
            error={errors.email?.message}
          />

          <PasswordInput
            label="Password"
            placeholder="Your password"
            mt="md"
            size="md"
            required
            {...register("password")}
            error={errors.password?.message}
          />

          <TextInput
            label="Avatar"
            type="file"
            mt="md"
            size="md"
            onChange={handleAvatarChange}
          />

          <Checkbox label="Keep me logged in" mt="xl" size="md" />
          <Button
            fullWidth
            mt="xl"
            size="md"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader size="sm" /> : "Register"}
          </Button>
        </form>

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
