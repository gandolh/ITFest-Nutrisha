import type { Recipe } from '@nutrisha/shared';
import { recipeRepository } from '../repositories.js';

export const recipeService = {
  getAllRecipes(): Promise<Recipe[]> {
    return recipeRepository.findAll();
  },

  getRecipeById(id: string): Promise<Recipe | null> {
    return recipeRepository.findById(id);
  },

  // Ported from RecipeService.getRecipesByIngredients: keep only recipes whose
  // ingredient list contains a substring match for every requested ingredient.
  async getRecipesByIngredients(ingredients: string[]): Promise<Recipe[]> {
    const recipes = await recipeRepository.findAll();
    return recipes.filter((recipe) =>
      ingredients.every((ingredient) => {
        if (recipe.ingredients == null) return false;
        return recipe.ingredients.some((ri) => ri.name.includes(ingredient));
      }),
    );
  },

  saveRecipe(recipe: Recipe): Promise<Recipe> {
    return recipeRepository.save(recipe);
  },

  deleteRecipe(id: string): Promise<void> {
    return recipeRepository.deleteById(id);
  },

  // Ported from RecipeMapper.updateDto: non-null fields from newRecipe override.
  async updateRecipe(id: string, newRecipe: Partial<Recipe>): Promise<Recipe> {
    const oldRecipe = (await recipeRepository.findById(id))!;
    const merged: Recipe = {
      ...oldRecipe,
      title: newRecipe.title ?? oldRecipe.title,
      description: newRecipe.description ?? oldRecipe.description,
      calories: newRecipe.calories ?? oldRecipe.calories,
      protein: newRecipe.protein ?? oldRecipe.protein,
      fat: newRecipe.fat ?? oldRecipe.fat,
      carbohydrate: newRecipe.carbohydrate ?? oldRecipe.carbohydrate,
      ingredients: newRecipe.ingredients ?? oldRecipe.ingredients,
      steps: newRecipe.steps ?? oldRecipe.steps,
    };
    return this.saveRecipe(merged);
  },
};
