import { DeepPartial} from "typeorm";
import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";

export const createUser = async (
  newUser: IUser,
  usersModel: typeof Users
): Promise<IUser & { id: number }> => {
  try {
    const user = usersModel.create(newUser as DeepPartial<Users>);
    await user.save();
    return user;
  } catch (error) {
    throw error;
  }
};
