import { api } from "../api";
import { Comment } from "../../types/comment";

export const createComment = async (comment: Comment) => {
  return await api.post("/logs/" + comment.logId + "/comments", comment);
};
