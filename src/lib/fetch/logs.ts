import { api } from "../api";

export const getLogsByProject = async (projectId: number) => {
  const responses = await api.get(`/logs/monitor/${projectId}`);
  return responses.data;
};

type QueryOptions = {
  Query?: string;
  Timestamp?: string;
  Level?: string;
};

export const queryLogsByProject = async (
  projectId: number,
  queryOptions: QueryOptions
) => {
  const { Query, Timestamp, Level } = queryOptions;
  const responses = await api.post(`/logs/${projectId}/query`, {
    Query,
    Timestamp,
    Level,
  });
  return responses.data;
};
