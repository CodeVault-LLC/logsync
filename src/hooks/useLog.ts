import { useQuery } from "@tanstack/react-query";
import { getLogsByProject } from "../lib/logs";
import { Log } from "../types/log";

export const useLogs = (projectId: number) => {
  return useQuery<Log[]>({
    queryKey: ["logs" + projectId],
    queryFn: () => getLogsByProject(projectId),
  });
};
