import { useQuery } from "@tanstack/react-query";
import { getNotifications } from "../lib/notification";
import { Notification } from "../types/notification";

export const useNotifications = () => {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: () => getNotifications(),
  });
};
