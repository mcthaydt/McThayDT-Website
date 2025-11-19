import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";

export async function registerRoutes(app: Express): Promise<Server> {
  // Seed the database with initial data if empty
  try {
    await storage.seed();
  } catch (error) {
    console.error("Failed to seed database:", error);
  }

  app.get("/api/projects", async (_req, res) => {
    try {
      const projects = await storage.getProjects();
      res.json(projects);
    } catch (error) {
      console.error("Error fetching projects:", error);
      res.status(500).json({ error: "Failed to fetch projects" });
    }
  });

  app.get("/api/services", async (_req, res) => {
    try {
      const services = await storage.getServices();
      res.json(services);
    } catch (error) {
      console.error("Error fetching services:", error);
      res.status(500).json({ error: "Failed to fetch services" });
    }
  });

  app.get("/api/prompts", async (_req, res) => {
    try {
      const prompts = await storage.getPrompts();
      res.json(prompts);
    } catch (error) {
      console.error("Error fetching prompts:", error);
      res.status(500).json({ error: "Failed to fetch prompts" });
    }
  });

  app.get("/api/facts", async (_req, res) => {
    try {
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
    } catch (error) {
      console.error("Error fetching facts:", error);
      res.status(500).json({ error: "Failed to fetch facts" });
    }
  });

  app.get("/api/psychographics", async (_req, res) => {
    try {
      const psychographics = await storage.getPsychographics();
      res.json(psychographics);
    } catch (error) {
      console.error("Error fetching psychographics:", error);
      res.status(500).json({ error: "Failed to fetch psychographics" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
