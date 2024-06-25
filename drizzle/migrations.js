// This file is required for Expo/React Native SQLite migrations - https://orm.drizzle.team/quick-sqlite/expo

import journal from "./meta/_journal.json";
import m0000 from "./0000_futuristic_shinko_yamashiro.sql";

const migrations = {
  journal,
  migrations: {
    m0000,
  },
};

export default migrations;
