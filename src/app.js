import express from "express";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { escapeHtml, getEnvironment } from "./environment.js";
import { buildGreeting } from "./greeting.js";
import { buildHealthPayload } from "./health.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const publicDir = path.join(__dirname, "..", "public");
const indexTemplate = fs.readFileSync(
  path.join(publicDir, "index.html"),
  "utf8",
);

export function createApp() {
  const app = express();

  app.get("/health", (_req, res) => {
    const payload = buildHealthPayload({ uptimeSeconds: process.uptime() });
    res.json(payload);
  });

  app.get("/", (_req, res) => {
    const html = indexTemplate.replace(
      "{{ENVIRONMENT}}",
      escapeHtml(getEnvironment()),
    );
    res.type("html").send(html);
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
