
import express from "express";
import { z } from "zod";
import { db } from "./db";
import { sql } from "drizzle-orm";
import { users } from "@shared/schema";

export const router = express.Router();

// Simple in-memory sessions for demonstration
// In production, use a proper session store
const sessions: Record<string, { userId: number; expires: Date }> = {};

// Login endpoint
router.post("/login", async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { email, password } = loginSchema.parse(req.body);
    
    // In a real app, you would:
    // 1. Properly hash and verify passwords
    // 2. Use a secure session management system
    
    // For demo purposes, we'll do a simple lookup
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email)
    });
    
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    
    // In a real app, verify password with bcrypt
    // if (!await bcrypt.compare(password, user.passwordHash)) {
    //   return res.status(401).json({ message: "Invalid email or password" });
    // }
    
    // Create a session
    const sessionId = Math.random().toString(36).substring(2, 15);
    const expires = new Date();
    expires.setDate(expires.getDate() + 7); // 7 days from now
    
    sessions[sessionId] = {
      userId: user.id,
      expires,
    };
    
    // Set session cookie
    res.cookie("sessionId", sessionId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      expires,
    });
    
    // Return user info (omitting sensitive fields)
    return res.status(200).json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input", errors: error.errors });
    }
    console.error("Login error:", error);
    return res.status(500).json({ message: "Authentication failed" });
  }
});

// Logout endpoint
router.post("/logout", (req, res) => {
  const sessionId = req.cookies.sessionId;
  
  if (sessionId && sessions[sessionId]) {
    delete sessions[sessionId];
  }
  
  res.clearCookie("sessionId");
  return res.status(200).json({ message: "Logged out successfully" });
});

// Signup endpoint
router.post("/signup", async (req, res) => {
  const signupSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
  });

  try {
    const { name, email, password } = signupSchema.parse(req.body);
    
    // Check if user already exists
    const existingUser = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.email, email)
    });
    
    if (existingUser) {
      return res.status(400).json({ message: "Email already in use" });
    }
    
    // In a real app, you would hash the password before storing
    // const passwordHash = await bcrypt.hash(password, 10);
    
    // Create the user
    const result = await db.insert(users).values({
      name,
      email,
      passwordHash: password, // In real app, we'd hash this password
    }).returning();
    
    // Return success response (without the password)
    const newUser = result[0];
    return res.status(201).json({
      user: {
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
      }
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid input", errors: error.errors });
    }
    console.error("Signup error:", error);
    return res.status(500).json({ message: "Failed to create account" });
  }
});

// Get current user status
router.get("/status", async (req, res) => {
  const sessionId = req.cookies.sessionId;
  
  if (!sessionId || !sessions[sessionId]) {
    return res.status(200).json({ authenticated: false });
  }
  
  const session = sessions[sessionId];
  
  // Check if session is expired
  if (new Date() > session.expires) {
    delete sessions[sessionId];
    res.clearCookie("sessionId");
    return res.status(200).json({ authenticated: false });
  }
  
  // Get user data
  try {
    const user = await db.query.users.findFirst({
      where: (users, { eq }) => eq(users.id, session.userId)
    });
    
    if (!user) {
      delete sessions[sessionId];
      res.clearCookie("sessionId");
      return res.status(200).json({ authenticated: false });
    }
    
    return res.status(200).json({
      authenticated: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      }
    });
  } catch (error) {
    console.error("Auth status error:", error);
    return res.status(500).json({ message: "Failed to get authentication status" });
  }
});
