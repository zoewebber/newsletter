import "reflect-metadata";
import { DataSource } from "typeorm";
import { Subscription } from "./entity/Subscription";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "newsletter",
  synchronize: true,
  logging: false,
  entities: [Subscription],
  migrations: [],
  subscribers: [],
});
