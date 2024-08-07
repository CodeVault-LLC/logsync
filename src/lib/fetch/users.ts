import { z } from "zod";
import { api } from "../api";
import { editUserSchema } from "../../schemas/user";

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

export const registerUser = async (formData: FormData) => {
  const response = await api.post("/users", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await api.post("/users/logout");
  return response.data;
};

export const updateUser = async (
  userId: number,
  userData: z.infer<typeof editUserSchema>
) => {
  console.log(userData);

  const response = await api.put(
    "/users/" + userId,
    {
      ...userData,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
  return response.data;
};

export const DEFAULT_USER_AVATAR_URL = (userId: number) =>
  api.defaults.baseURL + "/users/avatar/" + userId;
