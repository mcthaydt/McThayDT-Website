import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes are no longer needed as data is imported directly in the frontend
  // app.get("/api/projects", ...);

  const httpServer = createServer(app);

  return httpServer;
}
