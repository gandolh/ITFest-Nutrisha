package bmg.nutrition_assistant.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MealPlanDto {
    private DayPlanDto monday;
    private DayPlanDto tuesday;
    private DayPlanDto wednesday;
    private DayPlanDto thursday;
    private DayPlanDto friday;
    private DayPlanDto saturday;
    private DayPlanDto sunday;
}
