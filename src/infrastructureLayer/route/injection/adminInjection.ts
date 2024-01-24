import { Adminadapter } from "../../../controllerLayer/adminAdapter";
import { Adminusecase } from "../../../usecaseLayer/usecase/adminusecase";
import { Admin } from "../../entities/admin";
import { AdminRepository } from "../../repository/queries/adminRepository";
import Encrypt from "../../repository/services/bcryptRepository";
import jwtPassword from "../../repository/services/jwtRepository";
import RequestValidator from "../../repository/services/validatorRepository";

const repository = new AdminRepository(Admin);
const bcrypt = new Encrypt();
const jwt = new jwtPassword();
const requestValidator=new RequestValidator()
const usecase = new Adminusecase(repository, bcrypt, jwt, requestValidator);
const adapter = new Adminadapter(usecase);

export default adapter;
