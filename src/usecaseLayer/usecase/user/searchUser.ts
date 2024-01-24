import { IUser } from "../../../domainLayer/user";
import { Response } from "../../interface/Response";
import { IUserRepository } from "../../interface/userRepository";

export const searchUser = async (
  userRepository: IUserRepository,
  query: string,
  pagination: number
): Promise<Response<IUser[]>> => {
  try {
    const users = await userRepository.searchUser(pagination, query);
    return {
      status: 200,
      success: true,
      data: users,
    };
  } catch (err) {
    throw err;
  }
};
