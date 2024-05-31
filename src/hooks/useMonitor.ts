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

export const useCreateProject = (name: string, description: string) => {
  const queryClient = useQueryClient();

  return useMutation<Monitor>({
    mutationKey: ["createProject"],
    mutationFn: () => createProject(name, description),

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
