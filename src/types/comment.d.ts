export interface Comment {
  Username: string;
  Comment: string;
  LogId: string;
}

export interface CommentResponse {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;

  Comment: string;
  IsPinned: boolean;

  Username: string;
}
