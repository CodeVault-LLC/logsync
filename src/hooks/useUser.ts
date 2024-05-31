import { useMutation, useQuery } from "@tanstack/react-query";
import { getCurrentUser, loginUser, registerUser } from "../lib/fetch/users";
import { User } from "../types/user";
import Cookies from "universal-cookie";

export const useCurrentUser = () => {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: () => getCurrentUser(),
  });
};

export const useLogin = (username: string, password: string) => {
  return useMutation<string>({
    mutationKey: ["login"],
    mutationFn: () => loginUser(username, password),

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

export const useRegister = (
  username: string,
  password: string,
  email: string
) => {
  return useMutation<User>({
    mutationKey: ["register"],
    mutationFn: () => registerUser(username, password, email),

    onSuccess: () => {
      window.location.href = "/login";
    },
  });
};
