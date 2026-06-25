import type { Recipe } from '@nutrisha/shared';
import { recipeRepository } from '../repositories.js';

export const recipeService = {
  getAllRecipes(): Recipe[] {
    return recipeRepository.findAll();
  },

  getRecipeById(id: string): Recipe | null {
    return recipeRepository.findById(id);
  },

  // Ported from RecipeService.getRecipesByIngredients: keep only recipes whose
  // ingredient list contains a substring match for every requested ingredient.
  getRecipesByIngredients(ingredients: string[]): Recipe[] {
    const recipes = recipeRepository.findAll();
    return recipes.filter((recipe) =>
      ingredients.every((ingredient) => {
        if (recipe.ingredients == null) return false;
        return recipe.ingredients.some((ri) => ri.name.includes(ingredient));
      }),
    );
  },

  saveRecipe(recipe: Recipe): Recipe {
    return recipeRepository.save(recipe);
  },

  deleteRecipe(id: string): void {
    recipeRepository.deleteById(id);
  },

  // Ported from RecipeMapper.updateDto: non-null fields from newRecipe override.
  updateRecipe(id: string, newRecipe: Partial<Recipe>): Recipe {
    const oldRecipe = recipeRepository.findById(id)!;
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
