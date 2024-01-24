import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/Response";
import INodemailerRepository from "../../interface/nodemailerRepository";
import { IRequestValidator } from "../../interface/validateRepository";

export const verifyEmail = async (
  requestValidator: IRequestValidator,
  nodemailer: INodemailerRepository,
  email: string,
  username: string
): Promise<Response> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { email, username },
      ["email", "username"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }

    const verify = await nodemailer.sendEmailVerification(email, username);

    return {
      status: 200,
      success: true,
      message: verify,
    };
  } catch (err) {
    throw err;
  }
};
