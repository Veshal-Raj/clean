import { IUser } from "../../../domainLayer/user";
import { Response } from "../../interface/Response";
import { IUserRepository } from "../../interface/userRepository";

export const paginateUser = async (
  userRepository: IUserRepository,
  pageNumber: number
): Promise<Response<IUser[]>> => {
  try {
    const users = await userRepository.paginateUsers(pageNumber);
    return {
      status: 200,
      success: true,
      data: users,
    };
  } catch (err) {
    throw err;
  }
};
