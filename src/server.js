// src/server.js
import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cors());

const dbPath = path.join(__dirname, "shivam_data.db");

let db;
const start = async () => {
  db = await open({
    filename: dbPath,
    driver: sqlite3.Database,
  });

  app.get("/api/Tiles_data", async (req, res) => {
    try {
      const tiles = await db.all("SELECT * FROM mytable");
      res.json(tiles);
    } catch (err) {
      console.error("Database error:", err);
      res.status(500).send("Server error");
    }
  });

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
};

start();
