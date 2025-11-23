import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  const distPath = path.resolve(import.meta.dirname, "public");

  if (!fs.existsSync(distPath)) {
    console.warn(
      `Build directory not found: ${distPath}. Run 'npm run build' to create it.`,
    );
    
    // In production, serve a simple message if build doesn't exist
    app.use("*", (_req, res) => {
      res.status(503).send("Service temporarily unavailable. Please run: npm run build");
    });
    return;
  }

  // Serve static files with caching headers for better performance
  app.use(express.static(distPath, {
    maxAge: '1d',
    etag: true,
    lastModified: true,
  }));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
