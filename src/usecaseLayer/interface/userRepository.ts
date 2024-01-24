import { IUser } from "../../domainLayer/user";

export interface IUserRepository {
  createUser(newUser: IUser): Promise<IUser & { id: number }>;
  findUser(email: string): Promise<IUser | null>;
  updateUser(id: number, update: Partial<IUser>): Promise<IUser | null>;
  paginateUsers(pageNumber: number): Promise<IUser[]>;
  searchUser(pageNumber: number, searchQuery: string): Promise<IUser[]>;
  getAllParticipants(userIds: number[]): Promise<IUser[]>;
  checkPassword(password: string): Promise<IUser | null>;
}
