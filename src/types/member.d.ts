export interface Member {
  ID: number;
  CreatedAt: string;
  UpdatedAt: string;
  Member: {
    ID: number;
    CreatedAt: string;
    UpdatedAt: string;
    Username: string;
    Email: string;
    Role: string;
  };
  Role: string;
}
