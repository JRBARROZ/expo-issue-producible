import { Config } from "drizzle-kit";

export default {
  dialect: "sqlite", // "mysql" | "sqlite" | "postgresql"
  schema: "./src/config/schemas/*",
  out: "./drizzle",
  driver: "expo",
  verbose: true,
} satisfies Config;
