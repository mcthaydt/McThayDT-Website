import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed the database with initial data if empty
  await storage.seed();

  app.get("/api/projects", async (_req, res) => {
    const projects = await storage.getProjects();
    res.json(projects);
  });

  app.get("/api/services", async (_req, res) => {
    const services = await storage.getServices();
    res.json(services);
  });

  app.get("/api/prompts", async (_req, res) => {
    const prompts = await storage.getPrompts();
    res.json(prompts);
  });

  app.get("/api/facts", async (_req, res) => {
    const facts = await storage.getFactSheetItems();
    // Group facts by category
    const groupedFacts = facts.reduce((acc, fact) => {
      if (!acc[fact.category]) {
        acc[fact.category] = [];
      }
      acc[fact.category].push(fact.value);
      return acc;
    }, {} as Record<string, string[]>);
    res.json(groupedFacts);
  });

  app.get("/api/psychographics", async (_req, res) => {
    const psychographics = await storage.getPsychographics();
    res.json(psychographics);
  });

  const httpServer = createServer(app);

  return httpServer;
}
