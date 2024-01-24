import bcrypt from "bcrypt";
import Hashpassword from "../../../usecaseLayer/interface/hashpassword";

class Encrypt implements Hashpassword {
  //to hash the password
  async createHash(password: string): Promise<string> {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  //to compare the hashed password and the original password
  async compare(password: string, hashpassword: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hashpassword);
    return match;
  }
}

export default Encrypt;
