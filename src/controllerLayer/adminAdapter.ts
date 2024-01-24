import { Req, Res, Next } from "../infrastructureLayer/types/expressTypes";
import { Adminusecase } from "../usecaseLayer/usecase/adminusecase";

export class Adminadapter {
  private readonly adminusecase: Adminusecase;
  constructor(adminusecase: Adminusecase) {
    this.adminusecase = adminusecase;
  }

  //to create the admin
  async createAdmin(req: Req, res: Res, next: Next) {
    try {
      const { email, password } = req.body;
      const newAdmin = await this.adminusecase.createAdmin(email, password);
      newAdmin &&
        res.status(newAdmin.status).json({
          message: newAdmin.message,
          token: newAdmin.token,
        });
    } catch (err) {
      next(err);
    }
  }
}
