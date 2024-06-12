import cx from "clsx";
import { Link } from "@tanstack/react-router";
import { useNotifications } from "../hooks/useNotifications";
import {
  IconLogout,
  IconHeart,
  IconStar,
  IconMessage,
  IconSettings,
  IconSwitchHorizontal,
} from "@tabler/icons-react";
import {
  ActionIcon,
  AppShell,
  Avatar,
  Burger,
  Button,
  Flex,
  Group,
  Menu,
  Text,
  Tooltip,
  UnstyledButton,
  rem,
  useMantineTheme,
} from "@mantine/core";
import { useState } from "react";
import { useCurrentUser } from "../hooks/useUser";
import classes from "../styles/navbar.module.css";

type NavbarProps = {
  toggleMobile: () => void;
};

export const Navbar: React.FC<NavbarProps> = ({ toggleMobile }) => {
  const { data: notifications } = useNotifications();
  const theme = useMantineTheme();
  const [userMenuOpened, setUserMenuOpened] = useState(false);
  const { data } = useCurrentUser();

  return (
    <AppShell.Header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 20px",
      }}
    >
      <Flex gap={20} align="center">
        <Burger
          onClick={toggleMobile}
          aria-label="Toggle mobile navbar"
          visibleFrom="sm"
          hiddenFrom="md"
        />
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          <Text
            size="xl"
            style={{
              fontWeight: 700,
              color: theme.colors.blue[6],
            }}
          >
            LogSync
          </Text>
        </Link>
      </Flex>

      <Flex gap={10} align="center">
        {notifications?.length ? (
          <Menu>
            {notifications.map((notification) => (
              <Menu.Item key={notification.id}>
                {notification.message}
              </Menu.Item>
            ))}
          </Menu>
        ) : null}

        {data?.id ? (
          <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
          >
            <Menu.Target>
              <UnstyledButton
                className={cx(classes.user, {
                  [classes.userActive]: userMenuOpened,
                })}
              >
                <Group gap={7}>
                  <Tooltip label={data?.username} withArrow>
                    <ActionIcon size={42} variant="default">
                      <Avatar alt={data?.username} size="md" radius="xl" />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
              <Menu.Item>{data?.username}</Menu.Item>
              <Menu.Divider />
              <Menu.Item
                leftSection={
                  <IconHeart
                    style={{ width: rem(16), height: rem(16) }}
                    color={
                      (theme &&
                        theme.colors &&
                        theme.colors.red &&
                        theme?.colors?.red[6]) ??
                      "defaultColor"
                    }
                    stroke={1.5}
                  />
                }
              >
                Liked posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconStar
                    style={{ width: rem(16), height: rem(16) }}
                    color={
                      theme &&
                      theme.colors &&
                      theme.colors.yellow &&
                      theme.colors.yellow[6]
                    }
                    stroke={1.5}
                  />
                }
              >
                Saved posts
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconMessage
                    style={{ width: rem(16), height: rem(16) }}
                    color={
                      theme &&
                      theme.colors &&
                      theme.colors.blue &&
                      theme.colors.blue[6]
                    }
                    stroke={1.5}
                  />
                }
              >
                Your comments
              </Menu.Item>

              <Menu.Label>Settings</Menu.Label>
              <Menu.Item
                component="a"
                href="/settings"
                leftSection={
                  <IconSettings
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Account settings
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconSwitchHorizontal
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
              >
                Change account
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconLogout
                    style={{ width: rem(16), height: rem(16) }}
                    stroke={1.5}
                  />
                }
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        ) : (
          <Link
            to="/login"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <Button>Login</Button>
          </Link>
        )}
      </Flex>
    </AppShell.Header>
  );
};
