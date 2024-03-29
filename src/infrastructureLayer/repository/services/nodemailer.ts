import nodemailer from "nodemailer";
import INodemailer from "../../../usecaseLayer/interface/nodemailerRepository";

class Nodemailer implements INodemailer {
  private otps: Map<string, string> = new Map();

  //to generate otp
  generateOTP(): string {
    const digits = "0123456789";
    let otp = "";
    for (let i = 0; i < 6; i++) {
      otp += digits[Math.floor(Math.random() * 10)];
    }
    return otp;
  }

  //to send email for verification
  async sendEmailVerification(
    email: string,
    username: string
  ): Promise<string> {
    try {
      console.log(email, username);
      const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        requireTLS: false,
        auth: {
          user: process.env.EMAILID,
          pass: process.env.PASSWORD,
        },
      });

      const otp = this.generateOTP();
      this.otps.set(email, otp);

      const mailOptions = {
        from: "testingjobee007@gmail.com",
        to: email,
        subject: "Email Verification",
        html: `
        <div>
          <div style="margin-bottom: 10px">
            Hello ${username}, Welcome to <strong>Digital Campus</strong>! We are excited to have you on board. To get started, please verify your email address:
          </div>
          <div style="width: 75%; margin: 0 auto; background-color: black; color: white; padding: 4px; font-size: 3rem; text-align: center;">
            <strong style="text">${otp}</strong>
          </div>
        </div>
      `,
      };

      await transporter.sendMail(mailOptions);
      return "Email sent";
    } catch (error) {
      throw new Error(
        `Unable to send email verification email to ${email}: ${error}`
      );
    }
  }

  //to verfiy the email to check if it is crct or not
  async verifyEmail(enteredOTP: string, email: string): Promise<boolean> {
    try {
      const expectedOTP = this.otps.get(email);
      if (expectedOTP === enteredOTP) {
        this.otps.delete(email);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      throw new Error("Wrong otp");
    }
  }
}

export default Nodemailer;
