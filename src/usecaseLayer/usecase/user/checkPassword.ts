import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/Response";
import IHashpassword from "../../interface/hashpassword";
import { IUserRepository } from "../../interface/userRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const checkPassword = async (
  requestValidator: IRequestValidator,
  bcrypt: IHashpassword,
  userRepository: IUserRepository,
  bcryptPassword: string,
  oldPassword: string,
  newPassword: string,
  id: number
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { bcryptPassword, oldPassword, newPassword, id },
      ["bcryptPassword", "oldPassword", "newPassword", "id"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user = await userRepository.checkPassword(bcryptPassword);
    if (user) {
      if (await bcrypt.compare(oldPassword, user.password)) {
        const hashedPassword = await bcrypt.createHash(newPassword);
        const update = {
          password: hashedPassword,
        };
        await userRepository.updateUser(id, update);
        return {
          status: 200,
          success: true,
          message: "Password Changed",
        };
      }
      throw ErrorResponse.badRequest("Old password not matching");
    }
    throw ErrorResponse.notFound("No such user");
  } catch (err) {
    console.log(err);
    throw err;
  }
};
