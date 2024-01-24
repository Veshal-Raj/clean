import { In} from "typeorm";
import { IUser } from "../../../../domainLayer/user";
import { Users } from "../../../entities/user";

export const getAllParticipants = async (
  userIds: number[],
  usersModel: typeof Users
): Promise<IUser[]> => {
  try {
    const users = await usersModel.find({
      where: {
        id: In(userIds),
      },
      select: ["username", "profile", "id"],
    });

    return users;
  } catch (error) {
    throw error;
  }
};
