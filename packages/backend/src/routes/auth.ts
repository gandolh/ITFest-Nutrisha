import bcrypt from 'bcryptjs';
import type { FastifyInstance } from 'fastify';
import type { User, LoginRequest, GoogleLoginRequest } from '@nutrisha/shared';
import { userService } from '../services/userService.js';
import { Validator } from '../validator.js';

// Ported from controller/AuthController.java (@RequestMapping("/auth"))
export async function authRoutes(app: FastifyInstance): Promise<void> {
  app.post<{ Body: LoginRequest }>('/auth/login', async (request, reply) => {
    const { email, password } = request.body;
    const user = await userService.getUserByEmail(email);

    if (!user) {
      return reply.code(404).send();
    }
    if (!bcrypt.compareSync(password, user.password)) {
      return reply.code(400).send();
    }
    return reply.send(user);
  });

  app.post<{ Body: User }>('/auth/register', async (request, reply) => {
    const userDto = request.body;
    const existing = await userService.getUserByEmail(userDto.email);

    if (existing) {
      return reply.code(400).send();
    }

    // Faithful port of the original (buggy) all-&& guard: it only rejects when
    // EVERY field is invalid, so in practice almost nothing is rejected here.
    if (
      !Validator.isEmailValid(userDto.email) &&
      !Validator.isPasswordValid(userDto.password) &&
      !Validator.isNameValid(userDto.firstName) &&
      !Validator.isNameValid(userDto.lastName) &&
      !Validator.isHeightValid(userDto.height) &&
      !Validator.isWeightValid(userDto.weight)
    ) {
      return reply.code(400).send();
    }

    return reply.send(await userService.saveNewUser(userDto));
  });

  app.post<{ Body: GoogleLoginRequest }>('/auth/google', async (request, reply) => {
    const { email, firstName, lastName } = request.body;
    const existing = await userService.getUserByEmail(email);

    if (existing) {
      return reply.send(existing);
    }

    const userDto: User = {
      email,
      password: '',
      firstName,
      lastName,
      height: null,
      weight: null,
    };

    return reply.send(await userService.saveNewUser(userDto));
  });
}
