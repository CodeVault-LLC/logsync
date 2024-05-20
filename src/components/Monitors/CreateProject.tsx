import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  FormHelperText,
  LinearProgress,
  TextField,
} from "@mui/material";
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
    <Dialog
      open={createNew}
      onClose={() => setCreateNew(false)}
      PaperProps={{
        component: "form",
        onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
          event.preventDefault();
          mutate();
        },
      }}
    >
      <DialogTitle>Create a new monitor</DialogTitle>
      <DialogContent>
        <DialogContentText>
          When creating a new monitor, you will get a new list of monitors to
          follow. By default, the monitor will be active.
        </DialogContentText>
        {isPending && <LinearProgress />}

        <FormControl fullWidth>
          <TextField
            autoFocus
            disabled={isPending}
            required
            margin="dense"
            id="name"
            name="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setName(event.target.value)}
            value={name}
          />
          <FormHelperText>
            The displayed monitor name available for everyone to see.
          </FormHelperText>
        </FormControl>

        <FormControl fullWidth>
          <TextField
            margin="dense"
            disabled={isPending}
            id="description"
            name="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            onChange={(event) => setDescription(event.target.value)}
            value={description}
          />
          <FormHelperText>
            A helpful description for the monitor.
          </FormHelperText>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setCreateNew(false)}>Cancel</Button>
        <Button type="submit" disabled={isPending}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
