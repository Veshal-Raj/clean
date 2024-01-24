import { IAdmin } from "../../domainLayer/admin";

export interface IAdminRepository {
  create(newAdmin: IAdmin): Promise<IAdmin>;
  findAdmin(email: string): Promise<IAdmin | null>;
}
