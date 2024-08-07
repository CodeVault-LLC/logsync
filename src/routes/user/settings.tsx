import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Divider,
  Loader,
  Paper,
  Tabs,
  TextInput,
  Title,
} from "@mantine/core";
import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editUserSchema } from "../../schemas/user";
import { useCurrentUser, useEditUser } from "../../hooks/useUser";

const Settings: React.FC = () => {
  const { data, isPending } = useCurrentUser();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof editUserSchema>>({
    resolver: zodResolver(editUserSchema),
  });

  const {
    mutate,
    isPending: isMutationPending,
    isError,
    reset,
    isSuccess,
  } = useEditUser();

  return (
    <Tabs defaultValue="general" orientation="vertical">
      <Tabs.List>
        <Tabs.Tab value="general">General</Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="general" ml={20}>
        <Title order={2}>General Settings</Title>
        <Divider m={4} />
        <Paper>
          <form
            onSubmit={handleSubmit((dat) =>
              mutate({ id: data?.id ?? 0, data: dat })
            )}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            <TextInput
              {...register("username")}
              placeholder="Name"
              label="Name"
              defaultValue={data?.username ?? ""}
              error={errors.username?.message}
              required
            />

            <TextInput
              {...register("email")}
              placeholder="Description"
              label="Description"
              defaultValue={data?.email ?? ""}
              error={errors.email?.message}
              required
            />

            <Button type="submit" loading={isMutationPending}>
              {isMutationPending ? <Loader size={"sm"} /> : "Save"}
            </Button>
          </form>
        </Paper>
      </Tabs.Panel>
    </Tabs>
  );
};

export const Route = createFileRoute("/user/settings")({
  component: Settings,
});
