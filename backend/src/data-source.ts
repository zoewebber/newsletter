import "reflect-metadata";
import "dotenv/config";
import { DataSource } from "typeorm";
import { Subscription } from "./entity/Subscription";

const synchronize =
  process.env.TYPEORM_SYNCHRONIZE !== undefined
    ? process.env.TYPEORM_SYNCHRONIZE === "true"
    : process.env.NODE_ENV !== "production";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  synchronize,
  logging: false,
  entities: [Subscription],
  migrations: ["src/migration/*.ts"],
  subscribers: [],
});
