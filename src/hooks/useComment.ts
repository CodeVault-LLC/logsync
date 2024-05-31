import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createComment } from "../lib/fetch/comments";
import { Comment } from "../types/comment";

export const useCreateComment = (comment: Comment) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: ["createComment"],
    mutationFn: () => createComment(comment),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["logs"] });
    },
  });
};
