import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/Response";
import IHashpassword from "../../interface/hashpassword";
import { IUserRepository } from "../../interface/userRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const createUser = async (
  requestValidator: IRequestValidator,
  userRepository: IUserRepository,
  bcrypt: IHashpassword,
  firstName: string,
  lastName: string,
  username: string,
  email: string,
  password: string
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { firstName, lastName, username, email, password },
      ["firstName", "lastName", "username", "email", "password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const user = await userRepository.findUser(email); // checking if the user exist or not
    if (!user) {
      const hashedPassword = await bcrypt.createHash(password);
      const newUser = {
        firstName,
        lastName,
        email,
        username,
        password: hashedPassword,
      };
      const createnewUser = await userRepository.createUser(newUser);
      return {
        status: 200,
        success: true,
        message: "Successfully created",
      };
    }
    throw ErrorResponse.badRequest("User already exist");
  } catch (err) {
    throw err;
  }
};
