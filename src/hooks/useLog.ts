import { useMutation, useQuery } from "@tanstack/react-query";
import { getLogsByProject, queryLogsByProject } from "../lib/fetch/logs";
import { Log } from "../types/log";

export const useLogs = (projectId: number) => {
  return useQuery<Log[]>({
    queryKey: ["logs" + projectId],
    queryFn: () => getLogsByProject(projectId),
  });
};

type QueryOptions = {
  Query?: string;
  Timestamp?: string;
  Level?: string;
};

export const useLogQuery = (projectId: number, queryOptions: QueryOptions) => {
  return useMutation<Log[]>({
    mutationKey: ["logs" + projectId + "query"],
    mutationFn: () => queryLogsByProject(projectId, queryOptions),
  });
};
