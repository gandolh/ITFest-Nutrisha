package bmg.nutrition_assistant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class DayPlanDto {
    private RecipeDto breakfast;
    private String snack1;
    private RecipeDto lunch;
    private String snack2;
    private RecipeDto dinner;
}
