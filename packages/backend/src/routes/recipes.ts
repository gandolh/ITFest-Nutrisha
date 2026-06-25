import type { FastifyInstance } from 'fastify';
import type { Recipe } from '@nutrisha/shared';
import { recipeService } from '../services/recipeService.js';

// Ported from controller/RecipeController.java (@RequestMapping("/recipes"))
export async function recipeRoutes(app: FastifyInstance): Promise<void> {
  app.get('/recipes', (_request, reply) => {
    return reply.send(recipeService.getAllRecipes());
  });

  app.get<{ Params: { id: string } }>('/recipes/:id', (request, reply) => {
    const recipe = recipeService.getRecipeById(request.params.id);
    if (!recipe) return reply.code(404).send();
    return reply.send(recipe);
  });

  app.post<{ Body: string[] }>('/recipes/byIngredients', (request, reply) => {
    const ingredients = request.body;
    if (!ingredients || ingredients.length === 0) {
      return reply.send([]);
    }
    return reply.send(recipeService.getRecipesByIngredients(ingredients));
  });

  app.post<{ Body: Recipe }>('/recipes', (request, reply) => {
    return reply.send(recipeService.saveRecipe(request.body));
  });

  app.delete<{ Params: { id: string } }>('/recipes/:id', (request, reply) => {
    const recipe = recipeService.getRecipeById(request.params.id);
    if (!recipe) return reply.code(404).send();
    recipeService.deleteRecipe(request.params.id);
    return reply.send();
  });

  app.put<{ Params: { id: string }; Body: Partial<Recipe> }>(
    '/recipes/:id',
    (request, reply) => {
      const existing = recipeService.getRecipeById(request.params.id);
      if (!existing) return reply.code(404).send();
      return reply.send(recipeService.updateRecipe(request.params.id, request.body));
    },
  );
}
