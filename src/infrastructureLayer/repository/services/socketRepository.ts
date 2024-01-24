import { Server, Socket } from "socket.io";
import { Server as HttpServer } from "http";
import { UserRepository } from "../queries/userRepository";

export class SocketManager {
  private httpServer: HttpServer;
  private io: Server;
  private userRepository: UserRepository;

  constructor(httpServer: HttpServer, userRepository: UserRepository) {
    this.httpServer = httpServer;
    this.userRepository = userRepository;
    this.io = new Server(httpServer, {
      cors: {
        origin:
          "https://digital-campus.vercel.app",
      },
      path: "/socket-auth/",
    });

    this.io.on("connection", this.handleConnection);
  }

  private handleConnection = (socket: Socket): void => {
    socket.on("join-room", (email) => {
      console.log("A user connected.");
      socket.join(email);
    });

    // To block the user
    socket.on("isBlocked", async ({ email }: { email: string }) => {
      try {
        const user = await this.userRepository.findUser(email);
        if (user && user.id) {
          this.io
            .to(email)
            .emit("responseIsBlocked", { isBlocked: user.blocked });
        }
      } catch (error) {
        console.error("Error checking if user is blocked:", error);
      }
    });

    socket.on("disconnect", () => {
      console.log("A user disconnected!");
    });
  };

  start = (): void => {
    this.httpServer.listen(8000, () => {
      console.log("Socket server listening on port 6005");
    });
  };
}
