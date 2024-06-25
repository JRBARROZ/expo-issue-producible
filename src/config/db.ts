import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabaseSync } from "expo-sqlite";

const expo = openDatabaseSync("mydb.db", {
  enableChangeListener: true,
});

expo.execSync("PRAGMA foreign_keys = ON");
expo.execSync("PRAGMA journal_mode = WAL");

const db = drizzle(expo);

export { db, expo };
