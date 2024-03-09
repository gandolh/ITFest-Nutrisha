package bmg.nutrition_assistant.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@Getter
@Setter
public class RecipeStepDto {
    private Integer order;
    private String description;
}
