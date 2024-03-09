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
    private String breakfast;
    private String snack1;
    private String lunch;
    private String snack2;
    private String dinner;
}
