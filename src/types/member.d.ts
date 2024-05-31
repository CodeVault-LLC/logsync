import { User } from "./user";

export interface Member {
  createdAt: string;
  updatedAt: string;
  member: User;
  role: string;
}
