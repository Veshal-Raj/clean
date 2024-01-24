import ErrorResponse from "../../handler/errorResponse";
import { Response } from "../../interface/Response";
import { IAdminRepository } from "../../interface/adminRepository";
import IHashpassword from "../../interface/hashpassword";
import Ijwt from "../../interface/jwt";
import { IRequestValidator } from "../../interface/validateRepository";

export const createAdmin = async (
  requestValidator:IRequestValidator,
  adminRepository: IAdminRepository,
  bcrypt: IHashpassword,
  jwt: Ijwt,
  email: string,
  password: string
): Promise<Response & { token: string }> => {
  try {
    // Validate required parameters
    const validation = requestValidator.validateRequiredFields(
      { email,password},
      ["email","password"]
    );

    if (!validation.success) {
      throw ErrorResponse.badRequest(validation.message as string);
    }
    const admin = await adminRepository.findAdmin(email);
    if (admin && admin.id) {
      if (await bcrypt.compare(password, admin.password)) {
        const token = jwt.createJWT(admin.id, admin.email, "admin", "");
        return {
          status: 200,
          success: true,
          token: token,
          message: "Successfully logged in",
        };
      }
      throw ErrorResponse.badRequest("Wrong credientails");
    } else {
      if (password === process.env.CREDENTIALS) {
        const hashedPassword = await bcrypt.createHash(password);
        const newAdmin = await adminRepository.create({
          email,
          password: hashedPassword,
        });
        if (newAdmin.id) {
          const token = jwt.createJWT(newAdmin.id, newAdmin.email, "admin", "");
          return {
            status: 200,
            success: true,
            token: token,
            message: "Successfully logged in",
          };
        }
      }
      throw ErrorResponse.badRequest("Wrong credientails");
    }
  } catch (err) {
    throw err;
  }
};
