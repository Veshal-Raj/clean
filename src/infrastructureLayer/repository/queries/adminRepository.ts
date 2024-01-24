import { DeepPartial, Repository } from "typeorm";
import { IAdmin } from "../../../domainLayer/admin";
import { IAdminRepository } from "../../../usecaseLayer/interface/adminRepository";
import { Admin } from "../../entities/admin";
import { createAdmin } from "./admin/createAdmin";
import { findAdmin } from "./admin/findAdmin";

export class AdminRepository implements IAdminRepository {
  constructor(private AdminModel: typeof Admin) {}

  // Create a new admin
  async create(newAdmin: IAdmin): Promise<IAdmin> {
    return createAdmin(this.AdminModel, newAdmin);
  }

  // Find an admin by email
  async findAdmin(email: string): Promise<IAdmin | null> {
    return findAdmin(email, this.AdminModel);
  }
}
