import IJWT from "../../../usecaseLayer/interface/jwt";
import jwt from "jsonwebtoken";

class jwtPassword implements IJWT {
  //to create jwt token
  createJWT(userId: number, email: string, role: string, name: string): string {
    const jwtKey = process.env.JWT_KEY;
    if (jwtKey) {
      const token: string = jwt.sign(
        { id: userId, email: email, role: role, name: name },
        jwtKey
      );
      return token;
    }
    throw new Error("JWT_KEY is not defined");
  }
}

export default jwtPassword;
