import { pgTable, text, serial, integer, jsonb, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  passwordHash: text("password_hash").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const jewelryDesigns = pgTable("jewelry_designs", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  components: jsonb("components").notNull(),
  previewUrl: text("preview_url"),
  userId: integer("user_id").references(() => users.id),
});

export const componentSchema = z.object({
  id: z.string(),
  type: z.enum(["chain", "gem", "charm", "metal", "jewel", "accessory"]),
  imageUrl: z.string(),
  position: z.object({
    x: z.number(),
    y: z.number()
  }),
  properties: z.record(z.string(), z.union([z.string(), z.number()])),
});

export const insertJewelryDesignSchema = createInsertSchema(jewelryDesigns);

export type InsertJewelryDesign = z.infer<typeof insertJewelryDesignSchema>;
export type JewelryDesign = typeof jewelryDesigns.$inferSelect;
export type JewelryComponent = z.infer<typeof componentSchema>;
