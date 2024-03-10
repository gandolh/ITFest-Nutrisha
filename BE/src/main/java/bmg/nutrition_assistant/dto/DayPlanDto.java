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

    public int calculateTotalCalories() {
        return breakfast.getCalories() + lunch.getCalories() + dinner.getCalories();
    }

    public int calculateTotalProtein() {
        return breakfast.getProtein() + lunch.getProtein() + dinner.getProtein();
    }

    public int calculateTotalCarbohydrate() {
        return breakfast.getCarbohydrate() + lunch.getCarbohydrate() + dinner.getCarbohydrate();
    }

    public int calculateTotalFat() {
        return breakfast.getFat() + lunch.getFat() + dinner.getFat();
    }
}
