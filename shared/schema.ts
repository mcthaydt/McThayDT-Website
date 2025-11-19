import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
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
  subtitle: text("subtitle").notNull(), // e.g. Category
  content: text("content").notNull(),
  order: integer("order").notNull().default(0),
});

export const funFacts = pgTable("fun_facts", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // games, films, tv, artists, hobbies, episodes
  content: text("content").notNull(),
  order: integer("order").notNull().default(0),
});

export const personalStats = pgTable("personal_stats", {
  id: serial("id").primaryKey(),
  category: text("category").notNull(), // big5, astrology, mbti
  label: text("label").notNull(),
  valueNum: integer("value_num"), // For progress bars
  valueText: text("value_text"), // For text stats
  order: integer("order").notNull().default(0),
});

// Schemas for inserting (omitting auto-generated fields)
export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertServiceSchema = createInsertSchema(services).omit({ id: true });
export const insertPromptSchema = createInsertSchema(prompts).omit({ id: true });
export const insertFunFactSchema = createInsertSchema(funFacts).omit({ id: true });
export const insertPersonalStatSchema = createInsertSchema(personalStats).omit({ id: true });

// Types
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;

export type Service = typeof services.$inferSelect;
export type InsertService = z.infer<typeof insertServiceSchema>;

export type Prompt = typeof prompts.$inferSelect;
export type InsertPrompt = z.infer<typeof insertPromptSchema>;

export type FunFact = typeof funFacts.$inferSelect;
export type InsertFunFact = z.infer<typeof insertFunFactSchema>;

export type PersonalStat = typeof personalStats.$inferSelect;
export type InsertPersonalStat = z.infer<typeof insertPersonalStatSchema>;
