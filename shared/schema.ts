import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  description: text("description").notNull(),
  link: text("link").notNull(),
  order: integer("order").notNull().default(0),
});

export const services = pgTable("services", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  order: integer("order").notNull().default(0),
});

export const prompts = pgTable("prompts", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  subtitle: text("subtitle").notNull(),
  content: text("content").notNull(),
  order: integer("order").notNull().default(0),
});

export const factSheetItems = pgTable("fact_sheet_items", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // e.g., "games", "films"
  value: text("value").notNull(),
  order: integer("order").notNull().default(0),
});

export const psychographics = pgTable("psychographics", {
  id: serial("id").primaryKey(),
  type: text("type").notNull(), // "stat" or "fact"
  label: text("label").notNull(),
  value: text("value").notNull(), // stored as string, parsed for stats
  maxValue: integer("max_value"), // only for stats
  suffix: text("suffix"), // only for stats
  order: integer("order").notNull().default(0),
});

// Insert Schemas
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertPromptSchema = createInsertSchema(prompts).omit({ id: true });
export const insertFactSheetItemSchema = createInsertSchema(factSheetItems).omit({ id: true });
export const insertPsychographicSchema = createInsertSchema(psychographics).omit({ id: true });

// Types
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Prompt = typeof prompts.$inferSelect;
export type InsertPrompt = z.infer<typeof insertPromptSchema>;

export type FactSheetItem = typeof factSheetItems.$inferSelect;
export type InsertFactSheetItem = z.infer<typeof insertFactSheetItemSchema>;

export type Psychographic = typeof psychographics.$inferSelect;
export type InsertPsychographic = z.infer<typeof insertPsychographicSchema>;
