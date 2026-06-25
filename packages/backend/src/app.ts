import Fastify, { type FastifyInstance } from 'fastify';
import cors from '@fastify/cors';
import { authRoutes } from './routes/auth.js';
import { userRoutes } from './routes/users.js';
import { recipeRoutes } from './routes/recipes.js';

export async function buildApp(): Promise<FastifyInstance> {
  const app = Fastify({
    logger:
      process.env.NODE_ENV === 'production'
        ? true
        : { transport: { target: 'pino-pretty' } },
  });

  // Ported from config/CorsConfig.java: allow any origin/method/header,
  // with credentials.
  await app.register(cors, {
    origin: true,
    methods: '*',
    allowedHeaders: '*',
    credentials: true,
  });

  await app.register(authRoutes);
  await app.register(userRoutes);
  await app.register(recipeRoutes);

  app.get('/health', async () => ({ status: 'ok' }));

  return app;
}
