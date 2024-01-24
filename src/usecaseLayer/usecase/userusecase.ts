import { IUser } from "../../domainLayer/user";
import {
  createUser,
  loginUser,
  getUser,
  updateUser,
  verifyEmail,
  emailVeification,
  checkPassword,
  paginateUser,
  searchUser,
  updateForgetPassword
} from "../usecase/user/index";
import { IUserRepository } from "../interface/userRepository";
import IHashpassword from "../interface/hashpassword";
import Ijwt from "../interface/jwt";
import INodemailerRepository from "../interface/nodemailerRepository";
import { IRequestValidator } from "../interface/validateRepository";

export class Userusecase {
  private readonly userRepository: IUserRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly nodemailer: INodemailerRepository;
  private readonly requestValidator: IRequestValidator;

  constructor(
    userRepository: IUserRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    nodemailer: INodemailerRepository,
    requestValidator: IRequestValidator
  ) {
    this.userRepository = userRepository;
    this.bcrypt = bcrypt;
    this.jwt = jwt;
    this.nodemailer = nodemailer;
    this.requestValidator = requestValidator;
  }

  //to create user
  async createUser({
    firstName,
    lastName,
    username,
    email,
    password,
  }: {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
  }) {
    return createUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      firstName,
      lastName,
      username,
      email,
      password
    );
  }

  // allow login of the user
  async loginUser({ email, password }: { email: string; password: string }) {
    return loginUser(
      this.requestValidator,
      this.userRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }

  //to find the user using email
  async getUser(email: string) {
    return getUser(this.userRepository, email);
  }

  //to update the user details
  async updateUser({ id, update }: { id: number; update: Partial<IUser> }) {
    return updateUser(
      this.requestValidator,
      this.userRepository,
      id,
      update
    );
  }

  //to send OTP to verify the user's detail
  async verifyEmail({ email, username }: { email: string; username: string }) {
    return verifyEmail(this.requestValidator, this.nodemailer, email, username);
  }

  //to check if the user entered OTP is correct or not
  async emailVeification({ otp, email }: { otp: string; email: string }) {
    return emailVeification(this.requestValidator, this.nodemailer, otp, email);
  }

  async checkPassword({
    bcryptPassword,
    oldPassword,
    newPassword,
    id,
  }: {
    bcryptPassword: string;
    oldPassword: string;
    newPassword: string;
    id: number;
  }) {
    return checkPassword(
      this.requestValidator,
      this.bcrypt,
      this.userRepository,
      bcryptPassword,
      oldPassword,
      newPassword,
      id
    );
  }

  // pagination of the users collection
  async paginateUser(pageNumber: number) {
    return paginateUser(this.userRepository, pageNumber);
  }

  //to search user
  async searchUser(query: string, pagination: number) {
    return searchUser(this.userRepository, query, pagination);
  }

  async updateForgetPassword({id,newPassword}:{id:number,newPassword:string}){
    return updateForgetPassword(this.requestValidator,this.bcrypt,this.userRepository,id,newPassword);
  }
}
