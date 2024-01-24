import { IUser } from "../../../domainLayer/user";
import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/Response";
import { IUserRepository } from "../../interface/userRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const updateUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  id: number,
  update: Partial<IUser>
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields({ id, update }, [
      "id",
      "update",
    ]);

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const updatedUser = await userRepository.updateUser(id, update);

    if (updatedUser){

      return {
        status: 200,
        success: true,
        message: "Successfully updated",
      };
    }
    throw ErrorResponse.badRequest("Wrong id");
  } catch (err) {
    throw err;
  }
};
