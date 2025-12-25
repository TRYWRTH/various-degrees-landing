// server/index-prod.ts
import fs from "node:fs";
import path from "node:path";
import { type Server } from "node:http";

import express, { type Express } from "express";
import runApp from "./app";

export async function serveStatic(app: Express, _server: Server) {
  // when bundled, dist/index.js lives in dist/, and the frontend is also in dist/
  const distPath = path.resolve(import.meta.dirname, ".");

  if (!fs.existsSync(path.resolve(distPath, "index.html"))) {
    console.warn(
      `Build directory not found: ${distPath}. Run 'npm run build' to create it.`,
    );

    app.use("*", (_req, res) => {
      res
        .status(503)
        .send("Service temporarily unavailable. Please run: npm run build");
    });
    return;
  }

  app.use(
    express.static(distPath, {
      maxAge: "1d",
      etag: true,
      lastModified: true,
    }),
  );

  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

(async () => {
  await runApp(serveStatic);
})();
