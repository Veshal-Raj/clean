import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/Response";
import IHashpassword from "../../interface/hashpassword";
import Ijwt from "../../interface/jwt";
import { IUserRepository } from "../../interface/userRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const loginUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { email, password },
      ["email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user: IUser | null = await userRepository.findUser(email);

    if (user && user.id) {
      if (user.blocked) {
        throw ErrorResponse.badRequest("User is blocked");
      }
      const match: boolean = await bcrypt.compare(password, user.password);
      if (match) {
        const token = jwt.createJWT(user.id, user.email, "user", user.username);

        return {
          status: 200,
          success: true,
          data: token,
          message: "Sucessfully logged In",
        };
      }
      throw ErrorResponse.badRequest("Wrong password");
    }

    throw ErrorResponse.notFound("Wrong email id");
  } catch (err) {
    throw err;
  }
};
