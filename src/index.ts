import { db } from "./infrastructureLayer/config/db";
import { httpServer } from "./infrastructureLayer/config/app";

const startServer = async () => {
  const PORT = process.env.PORT || 3000;

  // Connect to the database
  await db();

  // Start the HTTP server
  const app = httpServer;

  app?.listen(PORT, () => {
    console.log(` connected to the server on port ${PORT}`);
  });
};

startServer();
