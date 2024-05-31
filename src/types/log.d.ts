import { CommentResponse } from "./comment";

export interface Log {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  Level: string;
  Message: string;
  AssignedTo: number;

  // Additional fields
  LogInformation: {
    Source: string;
    Tags: string[] | null;
    Line: number;
    Function: string;
    Solution: string;
    ErrorType: string;
    StackTrace: string;
    Context: string;
  };

  Comments: CommentResponse[];
}

export interface LogStatistic {
  ID: number;
  Date: string;
  Error: number;
  Info: number;
  Debug: number;
}
