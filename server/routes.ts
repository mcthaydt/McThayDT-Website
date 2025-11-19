import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertProjectSchema, insertServiceSchema, insertPromptSchema, insertFunFactSchema, insertPersonalStatSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // --- Projects ---
  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });
  app.post("/api/projects", async (req, res) => {
    const parsed = insertProjectSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const project = await storage.createProject(parsed.data);
    res.json(project);
  });
  app.put("/api/projects/:id", async (req, res) => {
    const parsed = insertProjectSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const project = await storage.updateProject(parseInt(req.params.id), parsed.data);
    res.json(project);
  });
  app.delete("/api/projects/:id", async (req, res) => {
    await storage.deleteProject(parseInt(req.params.id));
    res.status(204).end();
  });

  // --- Services ---
  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });
  app.post("/api/services", async (req, res) => {
    const parsed = insertServiceSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const service = await storage.createService(parsed.data);
    res.json(service);
  });
  app.put("/api/services/:id", async (req, res) => {
    const parsed = insertServiceSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const service = await storage.updateService(parseInt(req.params.id), parsed.data);
    res.json(service);
  });
  app.delete("/api/services/:id", async (req, res) => {
    await storage.deleteService(parseInt(req.params.id));
    res.status(204).end();
  });

  // --- Prompts ---
  app.get("/api/prompts", async (_req, res) => {
    const prompts = await storage.getPrompts();
    res.json(prompts);
  });
  app.post("/api/prompts", async (req, res) => {
    const parsed = insertPromptSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const prompt = await storage.createPrompt(parsed.data);
    res.json(prompt);
  });
  app.put("/api/prompts/:id", async (req, res) => {
    const parsed = insertPromptSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const prompt = await storage.updatePrompt(parseInt(req.params.id), parsed.data);
    res.json(prompt);
  });
  app.delete("/api/prompts/:id", async (req, res) => {
    await storage.deletePrompt(parseInt(req.params.id));
    res.status(204).end();
  });

  // --- Fun Facts ---
  app.get("/api/fun-facts", async (_req, res) => {
    const facts = await storage.getFunFacts();
    res.json(facts);
  });
  app.post("/api/fun-facts", async (req, res) => {
    const parsed = insertFunFactSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const fact = await storage.createFunFact(parsed.data);
    res.json(fact);
  });
  app.put("/api/fun-facts/:id", async (req, res) => {
    const parsed = insertFunFactSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const fact = await storage.updateFunFact(parseInt(req.params.id), parsed.data);
    res.json(fact);
  });
  app.delete("/api/fun-facts/:id", async (req, res) => {
    await storage.deleteFunFact(parseInt(req.params.id));
    res.status(204).end();
  });

  // --- Personal Stats ---
  app.get("/api/personal-stats", async (_req, res) => {
    const stats = await storage.getPersonalStats();
    res.json(stats);
  });
  app.post("/api/personal-stats", async (req, res) => {
    const parsed = insertPersonalStatSchema.safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const stat = await storage.createPersonalStat(parsed.data);
    res.json(stat);
  });
  app.put("/api/personal-stats/:id", async (req, res) => {
    const parsed = insertPersonalStatSchema.partial().safeParse(req.body);
    if (!parsed.success) return res.status(400).json(parsed.error);
    const stat = await storage.updatePersonalStat(parseInt(req.params.id), parsed.data);
    res.json(stat);
  });
  app.delete("/api/personal-stats/:id", async (req, res) => {
    await storage.deletePersonalStat(parseInt(req.params.id));
    res.status(204).end();
  });

  const httpServer = createServer(app);
  return httpServer;
}
