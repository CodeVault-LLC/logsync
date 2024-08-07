import {
  ActionIconGroup,
  Button,
  Divider,
  Flex,
  Modal,
  Text,
  TextInput,
} from "@mantine/core";
import { useCreateProject } from "../../hooks/useMonitor";
import { useEffect, useState } from "react";

type CreateProjectProps = {
  createNew: boolean;
  setCreateNew: (value: boolean) => void;
};

export const CreateProject: React.FC<CreateProjectProps> = ({
  createNew,
  setCreateNew,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const { mutate, isPending, isSuccess } = useCreateProject(name, description);

  useEffect(() => {
    if (!isPending && !createNew) {
      setName("");
      setDescription("");
    }

    if (isSuccess) {
      setCreateNew(false);
    }
  }, [isPending, createNew, isSuccess, setCreateNew]);

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
          onSubmit={(event) => {
            event.preventDefault();
            mutate();
          }}
          className="form"
        >
          <TextInput
            label="Name"
            value={name}
            onChange={(event) => setName(event.currentTarget.value)}
            placeholder="Monitor name"
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(event) => setDescription(event.currentTarget.value)}
            placeholder="Monitor description"
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
