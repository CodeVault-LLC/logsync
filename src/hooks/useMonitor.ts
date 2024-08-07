import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createProject,
  favoriteProject,
  getProject,
  getProjectStatistics,
  getProjects,
  retrieveProjectKey,
} from "../lib/fetch/monitors";
import { Monitor } from "../types/monitor";
import { LogStatistic } from "../types/log";

export const useProjects = () => {
  return useQuery<Monitor[]>({
    queryKey: ["monitors"],
    queryFn: () => getProjects(),
  });
};

export const useProject = (id: number) => {
  return useQuery<Monitor>({
    queryKey: ["monitor" + id],
    queryFn: () => getProject(id),
  });
};

export const useProjectStatistics = (id: number) => {
  return useQuery<LogStatistic[]>({
    queryKey: ["monitor" + id + "statistics"],
    queryFn: () => getProjectStatistics(id),
  });
};

export const useCreateMonitor = () => {
  const queryClient = useQueryClient();

  return useMutation<Monitor, void, { name: string; description: string }>({
    mutationKey: ["createProject"],
    mutationFn: (data: { name: string; description: string }) =>
      createProject(data.name, data.description),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["monitors"] });
    },
  });
};

export const useFavoriteProject = (id: number) => {
  return useMutation({
    mutationKey: ["favoriteProject"],
    mutationFn: () => favoriteProject(id),
  });
};

export const useMonitorKey = (id: number) => {
  return useMutation({
    mutationKey: ["monitor" + id + "key"],
    mutationFn: () => retrieveProjectKey(id),
  });
};
