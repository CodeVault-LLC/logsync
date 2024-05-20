import { api } from "./api";

export const getLogsByProject = async (projectId: number) => {
  const responses = await api.get(`/logs/monitor/${projectId}`);
  return responses.data;
};
