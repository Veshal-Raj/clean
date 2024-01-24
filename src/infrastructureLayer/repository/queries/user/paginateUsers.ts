import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";

export const paginateUsers = async (
  pageNumber: number,
  usersModel: typeof Users
): Promise<IUser[]> => {
  try {
    const users = await usersModel.find({
      skip: (pageNumber - 1) * 10,
      take: 10,
    });
    return users;
  } catch (error) {
    throw error;
  }
};
