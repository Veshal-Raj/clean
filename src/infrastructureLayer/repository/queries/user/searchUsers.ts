import { Like} from "typeorm";
import { Users } from "../../../entities/user";
import { IUser } from "../../../../domainLayer/user";

export const searchUser = async (
  pageNumber: number,
  searchQuery: string,
  usersModel: typeof Users
): Promise<IUser[]> => {
  try {
    const users = await usersModel.find({
      where: [{ email: Like(`%${searchQuery}%`) }],
      skip: (pageNumber - 1) * 10,
      take: 10,
    });

    return users;
  } catch (error) {
    throw error;
  }
};
