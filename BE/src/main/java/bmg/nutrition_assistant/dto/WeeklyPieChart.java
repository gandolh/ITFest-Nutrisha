package bmg.nutrition_assistant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class WeeklyPieChart {
    private String name;
    private int value;
}
