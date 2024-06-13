import { createFileRoute, useParams } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { useMembers, useWriteInvite } from "../../../hooks/useMember";
import {
  ActionIcon,
  Box,
  Divider,
  Paper,
  Table,
  Tabs,
  Text,
} from "@mantine/core";
import { IconPlus, IconSettings } from "@tabler/icons-react";

const MonitorSettingsAdvanced = () => {
  const { id }: { id: number } = useParams({ strict: false });

  const [editUserDialog, setEditUserDialogOpen] = useState(false);
  const [inviteUserDialog, setInviteUserDialogOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<{
    username: string;
    email: string;
    role: string;
  } | null>(null);
  const [email] = useState("");

  const { data: members } = useMembers(id);
  const { mutate: inviteUser } = useWriteInvite(id, email);

  const memberData = useMemo(() => {
    if (!members) return [];

    return members.map((member) => ({
      username: member.member.username,
      email: member.member.email,
      role: member.role,
    }));
  }, [members]);

  return (
      <Box>
        <Text variant="h5">Advanced Settings</Text>
        <Divider />

        <Paper style={{ mt: 2, p: 2 }} shadow="xs">
          <Box style={{ display: "flex", justifyContent: "space-between" }}>
            <Text variant="h6">Members</Text>
            <ActionIcon onClick={() => setInviteUserDialogOpen(true)}>
              <IconPlus />
            </ActionIcon>
          </Box>

          <Table>
            <Table.Thead>
              <Table.Td>Username</Table.Td>
              <Table.Td>Email</Table.Td>
              <Table.Td>Role</Table.Td>
            </Table.Thead>

            <Table.Tbody>
              {memberData.map((member) => (
                <Table.Tr>
                  <Table.Td>{member.username}</Table.Td>
                  <Table.Td>{member.email}</Table.Td>
                  <Table.Td>{member.role}</Table.Td>
                  <Table.Td>
                    <ActionIcon
                      onClick={() => {
                        setSelectedUser(member);
                        setEditUserDialogOpen(true);
                      }}
                    >
                      <IconSettings />
                    </ActionIcon>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Paper>
      </Box>
  );
};

export const Route = createFileRoute("/monitor/$id/settings/advanced")({
  component: MonitorSettingsAdvanced,
});
