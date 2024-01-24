import { Repository } from "typeorm";
import { IUser } from "../../../domainLayer/user";
import { IUserRepository } from "../../../usecaseLayer/interface/userRepository";
import { Users } from "../../entities/user";
import {
  checkPassword,
  createUser,
  findUser,
  getAllParticipants,
  paginateUsers,
  searchUser,
  updateUser,
} from "./user/index";

export class UserRepository implements IUserRepository {
  constructor(private readonly usersModel: typeof Users) {}

  // Create a user
  async createUser(newUser: IUser): Promise<IUser & { id: number }> {
    return createUser(newUser, this.usersModel);
  }

  // Check if a user exists using email
  async findUser(email: string): Promise<IUser | null> {
    return findUser(email, this.usersModel);
  }

  // Update user details
  async updateUser(id: number, update: Partial<IUser>): Promise<IUser | null> {
    return updateUser(id, update, this.usersModel);
  }

  // Get users data using pagination
  async paginateUsers(pageNumber: number): Promise<IUser[]> {
    return paginateUsers(pageNumber, this.usersModel);
  }

  // Get users using filtration
  async searchUser(pageNumber: number, searchQuery: string): Promise<IUser[]> {
    return searchUser(pageNumber, searchQuery, this.usersModel);
  }

  // Get all participants by userIds
  async getAllParticipants(userIds: number[]): Promise<IUser[]> {
    return getAllParticipants(userIds, this.usersModel);
  }

  // Check if the password is correct
  async checkPassword(password: string): Promise<IUser | null> {
    return checkPassword(password, this.usersModel);
  }
}
