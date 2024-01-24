import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";

export const checkPassword = async (
  password: string,
  usersModel: typeof Users
): Promise<IUser | null> => {
  const user = await usersModel.findOne({
    where: {
      password: password,
    },
  });

  return user || null;
};
