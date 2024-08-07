import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getCurrentUser,
  loginUser,
  logoutUser,
  registerUser,
} from "../lib/fetch/users";
import { User } from "../types/user";
import Cookies from "universal-cookie";

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: () => getCurrentUser(),
  });
};

export const useLogin = () => {
  return useMutation<string, void, { username: string; password: string }>({
    mutationKey: ["login"],
    mutationFn: (data) => loginUser(data.username, data.password),

    onSuccess: (data) => {
      const cookies = new Cookies();
      cookies.set("jwt", data, {
        path: "/",
        expires: new Date(Date.now() + 86400000),
        maxAge: 86400,
        secure: true,
        sameSite: "strict",
      });

      window.location.href = "/";
    },
  });
};

export const useRegister = () => {
  return useMutation<User, void, FormData>({
    mutationKey: ["register"],
    mutationFn: (formData) => registerUser(formData),

    onSuccess: () => {
      window.location.href = "/login";
    },
  });
};

export const useLogout = () => {
  return useMutation<void>({
    mutationKey: ["logout"],
    mutationFn: () => logoutUser(),
    onSuccess: () => {
      const cookies = new Cookies();
      cookies.remove("jwt", { path: "/" });
      window.location.href = "/login";
    },
  });
};
