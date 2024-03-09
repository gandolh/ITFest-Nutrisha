package bmg.nutrition_assistant.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RecipeIngredient {
    private Integer amount;
    private String name;
}
