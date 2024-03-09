package bmg.nutrition_assistant.mapper;

import bmg.nutrition_assistant.dto.RecipeIngredientDto;
import bmg.nutrition_assistant.entity.RecipeIngredient;

public class RecipeIngredientMapper {
    public static RecipeIngredientDto toDto(RecipeIngredient recipeIngredient) {
        RecipeIngredientDto recipeIngredientDto = new RecipeIngredientDto();

        recipeIngredientDto.setAmount(recipeIngredient.getAmount());
        recipeIngredientDto.setName(recipeIngredient.getName());

        return recipeIngredientDto;
    }

    public static RecipeIngredient toEntity(RecipeIngredientDto recipeIngredientDto) {
        RecipeIngredient recipeIngredient = new RecipeIngredient();

        recipeIngredient.setAmount(recipeIngredientDto.getAmount());
        recipeIngredient.setName(recipeIngredientDto.getName());

        return recipeIngredient;
    }
}
