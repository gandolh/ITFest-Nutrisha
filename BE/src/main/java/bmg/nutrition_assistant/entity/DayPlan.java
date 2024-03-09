package bmg.nutrition_assistant.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DayPlan {
    private String breakfast;
    private String snack1;
    private String lunch;
    private String snack2;
    private String dinner;
}
