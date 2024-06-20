import { DataSource, DataSourceOptions } from "typeorm";
import * as SQLite from "expo-sqlite";
import { Category, Post } from "./entitites";

export const config: DataSourceOptions = {
  database: "mydb.db",
  type: "expo",
  driver: SQLite,
  entities: [Category, Post],
  logging: true,
  logger: "simple-console",
  synchronize: true,
  entitySkipConstructor: true,
  dropSchema: true,
};

const conn = new DataSource(config);

export { conn };
