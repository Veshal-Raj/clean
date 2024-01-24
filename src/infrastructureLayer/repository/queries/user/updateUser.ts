import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";

export const updateUser = async (
  id: number,
  update: Partial<IUser>,
  usersModel: typeof Users
): Promise<IUser | null> => {
  try {
    const user = await usersModel.findOne({
      where: {
        id: id,
      },
    });

    if (user) {
      Object.assign(user, update);
      await usersModel.save(user);
      return user;
    }

    return null;
  } catch (error) {
    throw error;
  }
};
