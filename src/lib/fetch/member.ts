import { api } from "../api";

export const getMembers = async (id: number) => {
  const response = await api.get(`/monitors/${id}/members`);
  return response.data;
};

export const getInvites = async (id: number) => {
  const response = await api.get(`/monitors/${id}/invites`);
  return response.data;
};

export const createInvite = async (id: number, email: string) => {
  const response = await api.post(`/monitors/${id}/invite`, {
    email,
  });
  return response.data;
};

export const acceptInvite = async (id: number, token: string) => {
  const response = await api.post(`/monitors/${id}/invite/${token}`);
  return response.data;
};
