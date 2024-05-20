import { api } from "./api";

export const getUsers = async () => {
  const responses = await api.get("/users");
  return responses.data;
};

export const getUser = async (userId: number) => {
  const responses = await api.get("/users/" + userId);
  return responses.data;
};

export const getCurrentUser = async () => {
  const responses = await api.get("/users/current");
  return responses.data;
};

export const loginUser = async (username: string, password: string) => {
  const responses = await api.post("/users/login", { username, password });
  return responses.data;
};

export const registerUser = async (
  username: string,
  password: string,
  email: string
) => {
  const responses = await api.post("/users", { username, password, email });
  return responses.data;
};
