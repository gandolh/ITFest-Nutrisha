package bmg.nutrition_assistant.dto;

import lombok.Data;

import java.util.List;

@Data
public class Charts {
    private List<WeeklyPieChart> weeklyPieChart;
    private List<DailyBarChart> dailyBarChart;
}
