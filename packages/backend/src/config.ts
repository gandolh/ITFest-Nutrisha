import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Runtime configuration. The server keeps the original port (:8080); data now
// lives in a local SQLite file instead of MongoDB.
export const config = {
  port: Number(process.env.PORT ?? 8080),
  host: process.env.HOST ?? '0.0.0.0',
  // Default to <package>/data/nutrisha.db when DATABASE_PATH is not set.
  databasePath:
    process.env.DATABASE_PATH ?? resolve(__dirname, '..', 'data', 'nutrisha.db'),
};
