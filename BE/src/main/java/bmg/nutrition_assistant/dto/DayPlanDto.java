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
        int totalCalories = 0;
        if (breakfast != null) {
            totalCalories += breakfast.getCalories();
        }
        if (lunch != null) {
            totalCalories += lunch.getCalories();
        }
        if (dinner != null) {
            totalCalories += dinner.getCalories();
        }
        return totalCalories;
    }

    public int calculateTotalProtein() {
        int totalProtein = 0;
        if (breakfast != null) {
            totalProtein += breakfast.getProtein();
        }
        if (lunch != null) {
            totalProtein += lunch.getProtein();
        }
        if (dinner != null) {
            totalProtein += dinner.getProtein();
        }
        return totalProtein;
    }

    public int calculateTotalCarbohydrate() {
        int totalCarbohydrate = 0;
        if (breakfast != null) {
            totalCarbohydrate += breakfast.getCarbohydrate();
        }
        if (lunch != null) {
            totalCarbohydrate += lunch.getCarbohydrate();
        }
        if (dinner != null) {
            totalCarbohydrate += dinner.getCarbohydrate();
        }
        return totalCarbohydrate;
    }

    public int calculateTotalFat() {
        int totalFat = 0;
        if (breakfast != null) {
            totalFat += breakfast.getFat();
        }
        if (lunch != null) {
            totalFat += lunch.getFat();
        }
        if (dinner != null) {
            totalFat += dinner.getFat();
        }
        return totalFat;
    }
}
