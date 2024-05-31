import { useMutation, useQuery } from "@tanstack/react-query";
import { createInvite, getMembers } from "../lib/fetch/member";
import { Member } from "../types/member";

export const useMembers = (monitorId: number) => {
  return useQuery<Member[]>({
    queryKey: ["members"],
    queryFn: () => getMembers(monitorId),
  });
};

export const useWriteInvite = (monitorId: number, email: string) => {
  return useMutation({
    mutationKey: ["invite"],
    mutationFn: () => createInvite(monitorId, email),
  });
};
