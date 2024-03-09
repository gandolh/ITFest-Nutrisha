package bmg.nutrition_assistant.entity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class DayPlan {
    private Recipe breakfast;
    private String snack1;
    private Recipe lunch;
    private String snack2;
    private Recipe dinner;
}
