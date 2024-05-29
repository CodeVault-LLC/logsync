import { createFileRoute } from "@tanstack/react-router";

const MonitorSettingsGeneral = () => {
  return <div>Hello /monitor/$id/settings/general!</div>;
};

export const Route = createFileRoute("/monitor/$id/settings/general")({
  component: MonitorSettingsGeneral,
});
