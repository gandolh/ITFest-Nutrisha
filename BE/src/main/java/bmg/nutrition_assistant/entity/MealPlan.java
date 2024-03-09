package bmg.nutrition_assistant.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MealPlan {
    private DayPlan monday;
    private DayPlan tuesday;
    private DayPlan wednesday;
    private DayPlan thursday;
    private DayPlan friday;
    private DayPlan saturday;
    private DayPlan sunday;
}
