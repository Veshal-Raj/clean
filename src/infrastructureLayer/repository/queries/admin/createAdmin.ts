import { DeepPartial} from "typeorm";
import { IAdmin } from "../../../../domainLayer/admin";
import { Admin } from "../../../entities/admin";

export const createAdmin = async (
  AdminModel: typeof Admin,
  newAdmin: IAdmin
): Promise<IAdmin> => {
  try {
    const admin = AdminModel.create(newAdmin as DeepPartial<Admin>);
    await admin.save();
    return admin;
  } catch (error) {
    throw error;
  }
};
