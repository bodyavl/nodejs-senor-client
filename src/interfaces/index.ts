import { Role } from "../types";

export interface ICustomer {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  email: string;
  role: Role;
}
