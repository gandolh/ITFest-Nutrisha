import { buildApp } from './app.js';
import { config } from './config.js';
import { connectDb, closeDb } from './db.js';

async function main(): Promise<void> {
  await connectDb();
  const app = await buildApp();

  const shutdown = async () => {
    await app.close();
    await closeDb();
    process.exit(0);
  };
  process.on('SIGINT', shutdown);
  process.on('SIGTERM', shutdown);

  try {
    await app.listen({ port: config.port, host: config.host });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
}

main();
