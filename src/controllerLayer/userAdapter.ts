import { Next, Req, Res } from "../infrastructureLayer/types/expressTypes";
import { Userusecase } from "../usecaseLayer/usecase/userusecase";

export class UserAdapter {
  private readonly userusecase: Userusecase;

  constructor(userusecase: Userusecase) {
    this.userusecase = userusecase; // using dependency injection to call the userusecase
  }

  //to create the user
  async createUser(req: Req, res: Res, next: Next) {
    try {
      const newUser = await this.userusecase.createUser(req.body);

      newUser &&
        res.status(newUser.status).json({
          success: newUser.success,
          message: newUser.message,
        });
    } catch (err) {
      next(err);
    }
  }

  //to login user
  async loginUser(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.loginUser(req.body);
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
          message: user.message,
        });
    } catch (err) {
      next(err);
    }
  }

  //to get a particular user
  async getUser(req: Req, res: Res, next: Next) {
    try {
      const getUser = await this.userusecase.getUser(req.params.email);
      res.status(getUser.status).json({
        success: getUser.success,
        data: getUser.data,
        message: getUser.message,
      });
    } catch (err) {
      next(err);
    }
  }

  //to update the user
  async updateUser(req: Req, res: Res, next: Next) {
    try {
      const updateUser = await this.userusecase.updateUser(req.body);
      updateUser &&
        res.status(updateUser.status).json({
          success: updateUser.success,
          message: updateUser.message,
        });
    } catch (err) {
      next(err);
    }
  }

  //to send the email or verification
  async sendEmail(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.verifyEmail(req.body);
      res.status(user.status).json({
        success: user.success,
        message: user.message,
      });
    } catch (err) {
      next(err);
    }
  }

  //to verify whether the otp send through the email is same as that of the user
  async emailVerification(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.emailVeification(req.body);
      user &&
        res.status(user.status).json({
          success: user.success,
          data: user.data,
        });
    } catch (err) {
      next(err);
    }
  }

  //to reset the password
  async resetPassword(req: Req, res: Res, next: Next) {
    try {
      const user = await this.userusecase.checkPassword(req.body);
      res.status(user.status).json({
        message: user.message,
        success: user.success,
      });
    } catch (err) {
      next(err);
    }
  }

  //to paginate user
  async paginateUsers(req: Req, res: Res, next: Next) {
    try {
      let paginateNumber = parseInt(req.query.page as string);
      const users = await this.userusecase.paginateUser(paginateNumber);
      res.status(users.status).json({
        data: users.data,
      });
    } catch (err) {
      console.log(err);
      next(err);
    }
  }

  //to search a user
  async searchUser(req: Req, res: Res, next: Next) {
    try {
      let query = req.query.search as string;
      let users = await this.userusecase.searchUser(query, 1);
      res.status(users.status).json({
        data: users.data,
      });
    } catch (err) {
      next(err);
    }
  }

  //to change the forget password
  async updateForgotPassword(req: Req, res: Res, next: Next) {
    try {
      const updatePassword = await this.userusecase.updateForgetPassword(
        req.body
      );
      res.status(updatePassword.status).json({
        message: updatePassword.message,
        success: updatePassword.success,
      });
    } catch (err) {
      next(err);
    }
  }
}
