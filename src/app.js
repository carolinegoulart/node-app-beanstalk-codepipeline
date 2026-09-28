import express from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildGreeting } from "./greeting.js";
import { buildHealthPayload } from "./health.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");

export function createApp() {
  const app = express();

  app.get("/health", (_req, res) => {
    const payload = buildHealthPayload({ uptimeSeconds: process.uptime() });
    res.json(payload);
  });

  app.get("/", (_req, res) => {
    res.sendFile(path.join(publicDir, "index.html"));
  });

  app.get("/api/greeting", (req, res) => {
    try {
      const message = buildGreeting(req.query.name);
      res.json({ message });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  return app;
}
