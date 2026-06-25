import type { FastifyInstance } from 'fastify';
import type { User } from '@nutrisha/shared';
import { userService } from '../services/userService.js';

// Ported from controller/UserController.java (@RequestMapping("/users"))
export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.get('/users', async (_request, reply) => {
    return reply.send(await userService.getAllUsers());
  });

  app.get<{ Params: { id: string } }>('/users/:id', async (request, reply) => {
    const user = await userService.getUserById(request.params.id);
    if (!user) return reply.code(404).send();
    return reply.send(user);
  });

  app.post<{ Body: User }>('/users/getStats', async (request, reply) => {
    return reply.send(userService.getStats(request.body));
  });

  app.post<{ Body: User }>('/users', async (request, reply) => {
    return reply.send(await userService.saveUser(request.body));
  });

  app.delete<{ Params: { id: string } }>('/users/:id', async (request, reply) => {
    const user = await userService.getUserById(request.params.id);
    if (!user) return reply.code(404).send();
    await userService.deleteUser(request.params.id);
    return reply.send();
  });

  app.put<{ Params: { id: string }; Body: Partial<User> }>(
    '/users/:id',
    async (request, reply) => {
      const existing = await userService.getUserById(request.params.id);
      if (!existing) return reply.code(404).send();
      return reply.send(await userService.updateUser(request.params.id, request.body));
    },
  );
}
