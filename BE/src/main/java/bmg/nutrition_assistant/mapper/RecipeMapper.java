package bmg.nutrition_assistant.mapper;

import bmg.nutrition_assistant.dto.RecipeDto;
import bmg.nutrition_assistant.entity.Recipe;

public class RecipeMapper {
    public static RecipeDto toDto(Recipe recipe) {
        RecipeDto recipeDto = new RecipeDto();

        recipeDto.setId(recipe.getId());
        recipeDto.setTitle(recipe.getTitle());
        recipeDto.setDescription(recipe.getDescription());
        recipeDto.setCalorie(recipe.getCalorie());
        recipeDto.setProtein(recipe.getProtein());
        recipeDto.setFat(recipe.getFat());
        recipeDto.setCarbohydrate(recipe.getCarbohydrate());

        recipeDto.setIngredients(recipe.getIngredients() != null ? recipe.getIngredients().stream().map(RecipeIngredientMapper::toDto).toList() : null);
        recipeDto.setSteps(recipe.getSteps() != null ? recipe.getSteps().stream().map(RecipeStepMapper::toDto).toList() : null);

        return recipeDto;
    }

    public static Recipe toEntity(RecipeDto recipeDto) {
        Recipe recipe = new Recipe();

        recipe.setId(recipeDto.getId());
        recipe.setTitle(recipeDto.getTitle());
        recipe.setDescription(recipeDto.getDescription());
        recipe.setCalorie(recipeDto.getCalorie());
        recipe.setProtein(recipeDto.getProtein());
        recipe.setFat(recipeDto.getFat());
        recipe.setCarbohydrate(recipeDto.getCarbohydrate());

        recipe.setIngredients(recipeDto.getIngredients() != null ? recipeDto.getIngredients().stream().map(RecipeIngredientMapper::toEntity).toList() : null);
        recipe.setSteps(recipeDto.getSteps() != null ? recipeDto.getSteps().stream().map(RecipeStepMapper::toEntity).toList() : null);

        return recipe;
    }

    public static RecipeDto updateDto(RecipeDto oldRecipeDto, RecipeDto newRecipeDto) {
        oldRecipeDto.setTitle(newRecipeDto.getTitle() != null ? newRecipeDto.getTitle() : oldRecipeDto.getTitle());
        oldRecipeDto.setDescription(newRecipeDto.getDescription() != null ? newRecipeDto.getDescription() : oldRecipeDto.getDescription());
        oldRecipeDto.setCalorie(newRecipeDto.getCalorie() != null ? newRecipeDto.getCalorie() : oldRecipeDto.getCalorie());
        oldRecipeDto.setProtein(newRecipeDto.getProtein() != null ? newRecipeDto.getProtein() : oldRecipeDto.getProtein());
        oldRecipeDto.setFat(newRecipeDto.getFat() != null ? newRecipeDto.getFat() : oldRecipeDto.getFat());
        oldRecipeDto.setCarbohydrate(newRecipeDto.getCarbohydrate() != null ? newRecipeDto.getCarbohydrate() : oldRecipeDto.getCarbohydrate());

        oldRecipeDto.setIngredients(newRecipeDto.getIngredients() != null ? newRecipeDto.getIngredients() : oldRecipeDto.getIngredients());
        oldRecipeDto.setSteps(newRecipeDto.getSteps() != null ? newRecipeDto.getSteps() : oldRecipeDto.getSteps());

        return oldRecipeDto;
    }
}
