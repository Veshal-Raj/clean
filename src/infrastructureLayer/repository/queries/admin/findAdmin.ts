import { IAdmin } from "../../../../domainLayer/admin";
import { Admin } from "../../../entities/admin";

export const findAdmin = async (
  email: string,
  AdminModel: typeof Admin,
): Promise<IAdmin | null> => {
  try {
    const admin = await AdminModel.findOne({
      where: {
        email: email,
      },
    });

    return admin || null;
  } catch (error) {
    throw error;
  }
};
