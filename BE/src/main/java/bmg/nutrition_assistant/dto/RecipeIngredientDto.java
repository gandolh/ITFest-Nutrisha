package bmg.nutrition_assistant.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RecipeIngredientDto {
    private String amount;
    private String name;
}
