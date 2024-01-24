import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/Response";
import IHashpassword from "../../interface/hashpassword";
import { IUserRepository } from "../../interface/userRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const updateForgetPassword = async (
  requestValidator: IRequestValidator,
  bcrypt:IHashpassword,
  userRepository: IUserRepository,
  id: number,
  newPassword: string
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields({ id,newPassword }, [
      "id",
      "newPassword",
    ]);

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const hashedPassword =await bcrypt.createHash(newPassword);
    const update={
      password:hashedPassword
    }
    const updatedUser = await userRepository.updateUser(id, update);

    if (updatedUser)
      return {
        status: 200,
        success: true,
        message: "Successfully updated",
      };
    throw ErrorResponse.badRequest("Wrong id");
  } catch (err) {
    throw err;
  }
};
