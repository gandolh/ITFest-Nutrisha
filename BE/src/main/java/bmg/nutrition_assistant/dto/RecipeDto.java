package bmg.nutrition_assistant.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@Getter
@Setter
public class RecipeDto {
    private String id;
    private String title;
    private String description;
    private Integer calorie;
    private Integer protein;
    private Integer fat;
    private Integer carbohydrate;
    private List<RecipeIngredientDto> ingredients;
    private List<RecipeStepDto> steps;
}
