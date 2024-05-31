import { CommentResponse } from "./comment";

export interface Log {
  id: number;
  createdAt: string;
  updatedAt: string;
  level: string;
  message: string;
  assignedTo: number;

  // Additional fields
  logInformation: {
    source: string;
    tags: string[] | null;
    line: number;
    function: string;
    solution: string;
    errorType: string;
    stackTrace: string;
    context: string;
  };

  comments: CommentResponse[];
}

export interface LogStatistic {
  ID: number;
  Date: string;
  Error: number;
  Info: number;
  Debug: number;
}
