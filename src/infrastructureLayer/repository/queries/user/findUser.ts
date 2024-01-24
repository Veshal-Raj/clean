import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";


export const findUser = async (
  email: string,
  usersModel: typeof Users
): Promise<IUser | null> => {
  try {
    const user = await usersModel.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
};
