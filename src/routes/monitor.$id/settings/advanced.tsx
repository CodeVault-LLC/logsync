import { Add, Settings } from "@mui/icons-material";
import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  IconButton,
  Dialog,
  RadioGroup,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TextField,
  Typography,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControlLabel,
  Radio,
  Paper,
  TableRow,
} from "@mui/material";
import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMembers, useWriteInvite } from "../../../hooks/useMember";

const MonitorSettingsAdvanced = () => {
  const { id }: { id: number } = useParams({ strict: false });

  const [editUserDialog, setEditUserDialogOpen] = useState(false);
  const [inviteUserDialog, setInviteUserDialogOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<{
    username: string;
    email: string;
    role: string;
  } | null>(null);
  const [email, setEmail] = useState("");

  const { data: members } = useMembers(id);
  const { mutate: inviteUser } = useWriteInvite(id, email);

  const memberData = useMemo(() => {
    if (!members) return [];

    return members.map((member) => ({
      username: member.Member.Username,
      email: member.Member.Email,
      role: member.Role,
    }));
  }, [members]);

  return (
    <Box>
      <Typography variant="h5">Advanced Settings</Typography>
      <Divider />

      <Paper sx={{ mt: 2, p: 2 }} elevation={1}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Members</Typography>
          <IconButton onClick={() => setInviteUserDialogOpen(true)}>
            <Add />
          </IconButton>
        </Box>

        <Table>
          <TableHead>
            <TableCell>Username</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Role</TableCell>
          </TableHead>

          <TableBody>
            {memberData.map((member) => (
              <TableRow>
                <TableCell>{member.username}</TableCell>
                <TableCell>{member.email}</TableCell>
                <TableCell>{member.role}</TableCell>
                <TableCell>
                  <IconButton
                    onClick={() => {
                      setSelectedUser(member);
                      setEditUserDialogOpen(true);
                    }}
                  >
                    <Settings />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        <Dialog
          open={inviteUserDialog}
          onClose={() => setInviteUserDialogOpen(false)}
        >
          <DialogTitle>Invite User</DialogTitle>

          <DialogContent>
            <Box>
              <Divider />
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  width: 500,
                }}
              >
                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </FormControl>
              </Box>
            </Box>
          </DialogContent>

          <DialogActions>
            <Button
              onClick={() => {
                inviteUser();
                setInviteUserDialogOpen(false);
              }}
            >
              Invite
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={editUserDialog}
          onClose={() => {
            setEditUserDialogOpen(false);
            setSelectedUser(null);
          }}
        >
          <DialogTitle>Edit User</DialogTitle>

          <DialogContent>
            <Box>
              <Divider />
              <Box
                sx={{
                  mt: 2,
                  display: "flex",
                  gap: 2,
                  flexDirection: "column",
                  width: 500,
                }}
              >
                <FormControl>
                  <FormLabel>Username</FormLabel>
                  <TextField
                    placeholder="Username"
                    value={selectedUser?.username || ""}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Email</FormLabel>
                  <TextField
                    placeholder="Email"
                    value={selectedUser?.email || ""}
                  />
                </FormControl>

                <FormControl>
                  <FormLabel>Role</FormLabel>
                  <RadioGroup defaultValue={selectedUser?.role || "user"}>
                    <FormControlLabel
                      value="admin"
                      control={<Radio />}
                      label="Admin"
                    />
                    <FormControlLabel
                      value="user"
                      control={<Radio />}
                      label="User"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button>Save</Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Box>
  );
};

export const Route = createFileRoute("/monitor/$id/settings/advanced")({
  component: MonitorSettingsAdvanced,
});
