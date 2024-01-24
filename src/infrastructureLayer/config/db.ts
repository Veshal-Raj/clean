import { createConnection, ConnectionOptions, Connection } from "typeorm";
import { Users } from "../entities/user";
import { Admin } from "../entities/admin";

export const db = async (): Promise<void> => {
  try {
    // Environment variables for configuration
    const username = process.env.DATABASE_USERNAME as string;
    const password = process.env.DATABASE_PASSWORD as string;
    const database = process.env.DATABASE_NAME as string;

    if (username && database && password) {
      const connectionOptions: ConnectionOptions = {
        type: "postgres",
        host: "auth-postgres-srv",
        port: 5432,
        username: username,
        password: password,
        database: database,
        entities: [Users, Admin],
        synchronize: true,
      };

      const connection: Connection = await createConnection(connectionOptions);

      console.log("Connected to Postgres:", connection.name);
    }
  } catch (error) {
    throw new Error(`Postgres connection error: ${error}`);
  }
};
