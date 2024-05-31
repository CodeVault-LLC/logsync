import { api } from "../api";

export const getProject = async (id: number) => {
  const response = await api.get(`/monitors/${id}`);
  return response.data;
};

export const getProjects = async () => {
  const response = await api.get("/monitors");
  return response.data;
};

export const createProject = async (name: string, description: string) => {
  const response = await api.post("/monitors", { name, description });
  return response.data;
};

export const favoriteProject = async (id: number) => {
  const response = await api.post(`/monitors/${id}/favorite`);
  return response.data;
};

export const getProjectStatistics = async (id: number) => {
  const response = await api.get(`/monitors/${id}/statistic`);
  return response.data;
};

export const retrieveProjectKey = async (id: number) => {
  const response = await api.post(`/monitors/${id}/key`);
  return response.data;
};
