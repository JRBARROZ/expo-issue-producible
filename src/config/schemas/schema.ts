import { text, sqliteTable } from "drizzle-orm/sqlite-core";

const user = sqliteTable("users", {
  id: text("id").primaryKey().unique(),
  name: text("name").notNull().unique(),
});

const post = sqliteTable("posts", {
  id: text("id").primaryKey(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  author_id: text("author_id")
    .notNull()
    .references(() => user.id),
});

export type InsertUser = typeof user.$inferInsert;
export type InsertPost = typeof post.$inferInsert;

export { user, post };
