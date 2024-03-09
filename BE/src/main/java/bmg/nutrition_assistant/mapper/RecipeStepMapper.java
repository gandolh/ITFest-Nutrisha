package bmg.nutrition_assistant.mapper;

import bmg.nutrition_assistant.dto.RecipeStepDto;
import bmg.nutrition_assistant.entity.RecipeStep;

public class RecipeStepMapper {
    public static RecipeStepDto toDto(RecipeStep recipeStep) {
        RecipeStepDto recipeStepDto = new RecipeStepDto();

        recipeStepDto.setOrder(recipeStep.getOrder());
        recipeStepDto.setDescription(recipeStep.getDescription());

        return recipeStepDto;
    }

    public static RecipeStep toEntity(RecipeStepDto recipeStepDto) {
        RecipeStep recipeStep = new RecipeStep();

        recipeStep.setOrder(recipeStepDto.getOrder());
        recipeStep.setDescription(recipeStepDto.getDescription());

        return recipeStep;
    }
}
