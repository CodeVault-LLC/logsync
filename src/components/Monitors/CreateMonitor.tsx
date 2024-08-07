import {
  ActionIconGroup,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useCreateMonitor } from "../../hooks/useMonitor";
import { useEffect } from "react";
import { monitorSchema } from "../../schemas/monitor";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateProjectProps = {
  createNew: boolean;
  setCreateNew: (value: boolean) => void;
};

export const CreateMonitor: React.FC<CreateProjectProps> = ({
  createNew,
  setCreateNew,
}) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<z.infer<typeof monitorSchema>>({
    resolver: zodResolver(monitorSchema),
  });
  const { mutate, isPending, isError, reset, isSuccess } = useCreateMonitor();

  useEffect(() => {
    if (isSuccess) {
      setCreateNew(false);
    }

    if (isError) {
      reset();
    }
  }, [isError, isSuccess, reset, setCreateNew]);

  return (
    <Modal
      opened={createNew}
      onClose={() => setCreateNew(false)}
      title="Create Monitor"
    >
      <Modal.Header>
        <Flex justify="center" direction="column">
          <Text
            size="lg"
            style={{
              fontWeight: 700,
            }}
          >
            Create Monitor
          </Text>
          <Text size="sm" color="dimmed">
            Fill out the form below to create a new monitor
          </Text>
          <Divider mt="sm" />
        </Flex>
      </Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit((data) => {
            mutate(data);
          })}
          className="form"
        >
          <TextInput
            label="Name"
            placeholder="Monitor name"
            required
            error={errors.name?.message}
            {...register("name")}
          />

          <TextInput
            label="Description"
            placeholder="Monitor description"
            required
            error={errors.description?.message}
            {...register("description")}
          />

          <ActionIconGroup mt="lg">
            <Button type="submit" loading={isPending}>
              Create
            </Button>
          </ActionIconGroup>
        </form>
      </Modal.Body>
    </Modal>
  );
};
