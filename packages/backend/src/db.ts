import { mkdirSync } from 'node:fs';
import { dirname } from 'node:path';
import Database from 'better-sqlite3';
import { config } from './config.js';

let db: Database.Database | null = null;

// The domain objects are document-shaped (nested mealPlan / ingredients /
// steps). We keep scalar columns for the fields the app queries on and store
// the nested structures as JSON text columns.
function migrate(database: Database.Database): void {
  database.pragma('journal_mode = WAL');
  database.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id        TEXT PRIMARY KEY,
      email     TEXT UNIQUE,
      password  TEXT,
      firstName TEXT,
      lastName  TEXT,
      height    INTEGER,
      weight    INTEGER,
      mealPlan  TEXT
    );

    CREATE TABLE IF NOT EXISTS recipes (
      id           TEXT PRIMARY KEY,
      title        TEXT,
      description  TEXT,
      calories     INTEGER,
      protein      INTEGER,
      fat          INTEGER,
      carbohydrate INTEGER,
      ingredients  TEXT,
      steps        TEXT
    );
  `);
}

export function connectDb(): Database.Database {
  if (db) return db;
  mkdirSync(dirname(config.databasePath), { recursive: true });
  db = new Database(config.databasePath);
  migrate(db);
  return db;
}

export function getDb(): Database.Database {
  if (!db) {
    throw new Error('Database not connected. Call connectDb() first.');
  }
  return db;
}

export function closeDb(): void {
  if (db) {
    db.close();
    db = null;
  }
}
