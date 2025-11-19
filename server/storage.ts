import { 
  projects, services, prompts, funFacts, personalStats,
  type Project, type InsertProject,
  type Service, type InsertService,
  type Prompt, type InsertPrompt,
  type FunFact, type InsertFunFact,
  type PersonalStat, type InsertPersonalStat
} from "@shared/schema";
import { db } from "./db";
import { eq, asc } from "drizzle-orm";

export interface IStorage {
  // Projects
  getProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
  updateProject(id: number, project: Partial<InsertProject>): Promise<Project>;
  deleteProject(id: number): Promise<void>;

  // Services
  getServices(): Promise<Service[]>;
  createService(service: InsertService): Promise<Service>;
  updateService(id: number, service: Partial<InsertService>): Promise<Service>;
  deleteService(id: number): Promise<void>;

  // Prompts
  getPrompts(): Promise<Prompt[]>;
  createPrompt(prompt: InsertPrompt): Promise<Prompt>;
  updatePrompt(id: number, prompt: Partial<InsertPrompt>): Promise<Prompt>;
  deletePrompt(id: number): Promise<void>;

  // Fun Facts
  getFunFacts(): Promise<FunFact[]>;
  createFunFact(fact: InsertFunFact): Promise<FunFact>;
  updateFunFact(id: number, fact: Partial<InsertFunFact>): Promise<FunFact>;
  deleteFunFact(id: number): Promise<void>;

  // Personal Stats
  getPersonalStats(): Promise<PersonalStat[]>;
  createPersonalStat(stat: InsertPersonalStat): Promise<PersonalStat>;
  updatePersonalStat(id: number, stat: Partial<InsertPersonalStat>): Promise<PersonalStat>;
  deletePersonalStat(id: number): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  // Projects
  async getProjects(): Promise<Project[]> {
    return await db.select().from(projects).orderBy(asc(projects.order));
  }
  async createProject(insertProject: InsertProject): Promise<Project> {
    const [project] = await db.insert(projects).values(insertProject).returning();
    return project;
  }
  async updateProject(id: number, updateData: Partial<InsertProject>): Promise<Project> {
    const [project] = await db.update(projects).set(updateData).where(eq(projects.id, id)).returning();
    return project;
  }
  async deleteProject(id: number): Promise<void> {
    await db.delete(projects).where(eq(projects.id, id));
  }

  // Services
  async getServices(): Promise<Service[]> {
    return await db.select().from(services).orderBy(asc(services.order));
  }
  async createService(insertService: InsertService): Promise<Service> {
    const [service] = await db.insert(services).values(insertService).returning();
    return service;
  }
  async updateService(id: number, updateData: Partial<InsertService>): Promise<Service> {
    const [service] = await db.update(services).set(updateData).where(eq(services.id, id)).returning();
    return service;
  }
  async deleteService(id: number): Promise<void> {
    await db.delete(services).where(eq(services.id, id));
  }

  // Prompts
  async getPrompts(): Promise<Prompt[]> {
    return await db.select().from(prompts).orderBy(asc(prompts.order));
  }
  async createPrompt(insertPrompt: InsertPrompt): Promise<Prompt> {
    const [prompt] = await db.insert(prompts).values(insertPrompt).returning();
    return prompt;
  }
  async updatePrompt(id: number, updateData: Partial<InsertPrompt>): Promise<Prompt> {
    const [prompt] = await db.update(prompts).set(updateData).where(eq(prompts.id, id)).returning();
    return prompt;
  }
  async deletePrompt(id: number): Promise<void> {
    await db.delete(prompts).where(eq(prompts.id, id));
  }

  // Fun Facts
  async getFunFacts(): Promise<FunFact[]> {
    return await db.select().from(funFacts).orderBy(asc(funFacts.order));
  }
  async createFunFact(insertFact: InsertFunFact): Promise<FunFact> {
    const [fact] = await db.insert(funFacts).values(insertFact).returning();
    return fact;
  }
  async updateFunFact(id: number, updateData: Partial<InsertFunFact>): Promise<FunFact> {
    const [fact] = await db.update(funFacts).set(updateData).where(eq(funFacts.id, id)).returning();
    return fact;
  }
  async deleteFunFact(id: number): Promise<void> {
    await db.delete(funFacts).where(eq(funFacts.id, id));
  }

  // Personal Stats
  async getPersonalStats(): Promise<PersonalStat[]> {
    return await db.select().from(personalStats).orderBy(asc(personalStats.order));
  }
  async createPersonalStat(insertStat: InsertPersonalStat): Promise<PersonalStat> {
    const [stat] = await db.insert(personalStats).values(insertStat).returning();
    return stat;
  }
  async updatePersonalStat(id: number, updateData: Partial<InsertPersonalStat>): Promise<PersonalStat> {
    const [stat] = await db.update(personalStats).set(updateData).where(eq(personalStats.id, id)).returning();
    return stat;
  }
  async deletePersonalStat(id: number): Promise<void> {
    await db.delete(personalStats).where(eq(personalStats.id, id));
  }
}

export const storage = new DatabaseStorage();
