import { createFileRoute } from "@tanstack/react-router";

const Dashboard: React.FC = () => {
  return <div>Dashboard</div>;
};

export const Route = createFileRoute("/")({
  component: Dashboard,
});
