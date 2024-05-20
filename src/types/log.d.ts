export interface Log {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  DeletedAt: string;

  Type: string;
  ErrorCode: string;
  Message: string;
  LineNumber: number;
  FileName: string;
  FunctionName: string;
  StackTrace: string;
}

export interface LogStatistic {
  ID: number;
  Date: string;
  Error: number;
  Info: number;
  Debug: number;
}
