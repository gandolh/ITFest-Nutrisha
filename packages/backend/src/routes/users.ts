import type { FastifyInstance } from 'fastify';
import type { User } from '@nutrisha/shared';
import { userService } from '../services/userService.js';

// Ported from controller/UserController.java (@RequestMapping("/users"))
export async function userRoutes(app: FastifyInstance): Promise<void> {
  app.get('/users', (_request, reply) => {
    return reply.send(userService.getAllUsers());
  });

  app.get<{ Params: { id: string } }>('/users/:id', (request, reply) => {
    const user = userService.getUserById(request.params.id);
    if (!user) return reply.code(404).send();
    return reply.send(user);
  });

  app.post<{ Body: User }>('/users/getStats', (request, reply) => {
    return reply.send(userService.getStats(request.body));
  });

  app.post<{ Body: User }>('/users', (request, reply) => {
    return reply.send(userService.saveUser(request.body));
  });

  app.delete<{ Params: { id: string } }>('/users/:id', (request, reply) => {
    const user = userService.getUserById(request.params.id);
    if (!user) return reply.code(404).send();
    userService.deleteUser(request.params.id);
    return reply.send();
  });

  app.put<{ Params: { id: string }; Body: Partial<User> }>(
    '/users/:id',
    (request, reply) => {
      const existing = userService.getUserById(request.params.id);
      if (!existing) return reply.code(404).send();
      return reply.send(userService.updateUser(request.params.id, request.body));
    },
  );
}
