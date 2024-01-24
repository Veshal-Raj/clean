import { IAdminRepository } from "../interface/adminRepository";
import IHashpassword from "../interface/hashpassword";
import Ijwt from "../interface/jwt";
import { IRequestValidator } from "../interface/validateRepository";
import { createAdmin } from "./admin/index";

export class Adminusecase {
  private readonly adminRepository: IAdminRepository;
  private readonly bcrypt: IHashpassword;
  private readonly jwt: Ijwt;
  private readonly requsetValidator: IRequestValidator;

  constructor(
    adminRepository: IAdminRepository,
    bcrypt: IHashpassword,
    jwt: Ijwt,
    requsetValidator: IRequestValidator
  ) {
    (this.adminRepository = adminRepository),
      (this.bcrypt = bcrypt),
      (this.jwt = jwt);
    this.requsetValidator = requsetValidator;
  }

  //to create a admin
  async createAdmin(email: string, password: string) {
    return createAdmin(
      this.requsetValidator,
      this.adminRepository,
      this.bcrypt,
      this.jwt,
      email,
      password
    );
  }
}
