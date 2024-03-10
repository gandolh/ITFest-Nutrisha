package bmg.nutrition_assistant.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class DailyBarChart {
    private String day;
    private int calories;
    private int protein;
    private int carbohydrate;
    private int fat;
}
