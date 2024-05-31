export interface Comment {
  username: string;
  comment: string;
  logId: string;
}

export interface CommentResponse {
  id: string;
  createdAt: string;
  updatedAt: string;

  comment: string;
  isPinned: boolean;

  username: string;
}
