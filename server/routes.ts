import type { Express } from "express";
import { createServer } from "http";
import { storage } from "./storage";
import { insertJewelryDesignSchema } from "@shared/schema";
import cookieParser from "cookie-parser";
import { router as authRouter } from "./auth";

export async function registerRoutes(app: Express) {
  const httpServer = createServer(app);
  
  // Add cookie parser middleware
  app.use(cookieParser());

  // Auth routes
  app.use("/api/auth", authRouter);

  // API routes for jewelry designs
  app.get("/api/designs", async (_req, res) => {
    const designs = await storage.getAllDesigns();
    res.json(designs);
  });

  app.post("/api/designs", async (req, res) => {
    const result = insertJewelryDesignSchema.safeParse(req.body);
    if (!result.success) {
      return res.status(400).json({ message: "Invalid design data" });
    }

    const design = await storage.createDesign(result.data);
    res.status(201).json(design);
  });

  return httpServer;
}
