import { db } from "./db";
import * as schema from "./schemas/schema";
export default function useRepository() {
  async function createUser() {
    try {
      await db.insert(schema.user).values({
        id: "1",
        name: "John",
      });
    } catch (err) {
      console.log(err);
    }
  }
  async function post() {}
  return {
    createUser,
  };
}
