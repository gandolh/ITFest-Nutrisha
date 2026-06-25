import type { FastifyInstance } from 'fastify';
import type { Recipe } from '@nutrisha/shared';
import { recipeService } from '../services/recipeService.js';

// Ported from controller/RecipeController.java (@RequestMapping("/recipes"))
export async function recipeRoutes(app: FastifyInstance): Promise<void> {
  app.get('/recipes', async (_request, reply) => {
    return reply.send(await recipeService.getAllRecipes());
  });

  app.get<{ Params: { id: string } }>('/recipes/:id', async (request, reply) => {
    const recipe = await recipeService.getRecipeById(request.params.id);
    if (!recipe) return reply.code(404).send();
    return reply.send(recipe);
  });

  app.post<{ Body: string[] }>('/recipes/byIngredients', async (request, reply) => {
    const ingredients = request.body;
    if (!ingredients || ingredients.length === 0) {
      return reply.send([]);
    }
    return reply.send(await recipeService.getRecipesByIngredients(ingredients));
  });

  app.post<{ Body: Recipe }>('/recipes', async (request, reply) => {
    return reply.send(await recipeService.saveRecipe(request.body));
  });

  app.delete<{ Params: { id: string } }>('/recipes/:id', async (request, reply) => {
    const recipe = await recipeService.getRecipeById(request.params.id);
    if (!recipe) return reply.code(404).send();
    await recipeService.deleteRecipe(request.params.id);
    return reply.send();
  });

  app.put<{ Params: { id: string }; Body: Partial<Recipe> }>(
    '/recipes/:id',
    async (request, reply) => {
      const existing = await recipeService.getRecipeById(request.params.id);
      if (!existing) return reply.code(404).send();
      return reply.send(await recipeService.updateRecipe(request.params.id, request.body));
    },
  );
}
