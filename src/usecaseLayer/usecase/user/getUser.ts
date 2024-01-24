import { IUser } from "../../../domainLayer/user";
import { Response } from "../../interface/Response";
import { IUserRepository } from "../../interface/userRepository";

export const getUser = async (
  userRepository: IUserRepository,
  email: string
): Promise<Response<IUser>> => {
  try {
    const user = await userRepository.findUser(email);

    return user
      ? {
          status: 200,
          success: true,
          data: user,
        }
      : {
          status: 200,
          success: false,
          message: "No such user",
        };
  } catch (err) {
    throw err;
  }
};
