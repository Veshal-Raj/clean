import { UserRepository } from "../../repository/queries/userRepository";
import { Userusecase } from "../../../usecaseLayer/usecase/userusecase";
import Encrypt from "../../repository/services/bcryptRepository";
import { UserAdapter } from "../../../controllerLayer/userAdapter";
import { Users } from "../../entities/user";
import jwtPassword from "../../repository/services/jwtRepository";
import Nodemailer from "../../repository/services/nodemailer";
import RequestValidator from "../../repository/services/validatorRepository";


// factory pattern
const userRepository = new UserRepository(Users);
const bcrypt = new Encrypt();
const jwt = new jwtPassword();
const nodemailer = new Nodemailer();
const requestValidator = new RequestValidator();
const userusecase = new Userusecase(
  userRepository,
  bcrypt,
  jwt,
  nodemailer,
  requestValidator
);
const userAdapter = new UserAdapter(userusecase);

export { userAdapter, userRepository };
