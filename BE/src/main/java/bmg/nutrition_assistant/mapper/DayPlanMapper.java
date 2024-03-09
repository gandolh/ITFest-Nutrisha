package bmg.nutrition_assistant.mapper;

import bmg.nutrition_assistant.dto.DayPlanDto;
import bmg.nutrition_assistant.entity.DayPlan;

public class DayPlanMapper {
    public static DayPlanDto toDto(DayPlan dayPlan) {
        DayPlanDto dayPlanDto = new DayPlanDto();

        dayPlanDto.setBreakfast(dayPlan.getBreakfast());
        dayPlanDto.setSnack1(dayPlan.getSnack1());
        dayPlanDto.setLunch(dayPlan.getLunch());
        dayPlanDto.setSnack2(dayPlan.getSnack2());
        dayPlanDto.setDinner(dayPlan.getDinner());

        return dayPlanDto;
    }

    public static DayPlan toEntity(DayPlanDto dayPlanDto) {
        DayPlan dayPlan = new DayPlan();

        dayPlan.setBreakfast(dayPlanDto.getBreakfast());
        dayPlan.setSnack1(dayPlanDto.getSnack1());
        dayPlan.setLunch(dayPlanDto.getLunch());
        dayPlan.setSnack2(dayPlanDto.getSnack2());
        dayPlan.setDinner(dayPlanDto.getDinner());

        return dayPlan;
    }
}
