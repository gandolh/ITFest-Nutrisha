package bmg.nutrition_assistant.mapper;

import bmg.nutrition_assistant.dto.DayPlanDto;
import bmg.nutrition_assistant.entity.DayPlan;

public class DayPlanMapper {
    public static DayPlanDto toDto(DayPlan dayPlan) {
        if (dayPlan == null) {
            return null;
        }

        DayPlanDto dayPlanDto = new DayPlanDto();

        dayPlanDto.setBreakfast(RecipeMapper.toDto(dayPlan.getBreakfast()));
        dayPlanDto.setSnack1(dayPlan.getSnack1());
        dayPlanDto.setLunch(RecipeMapper.toDto(dayPlan.getLunch()));
        dayPlanDto.setSnack2(dayPlan.getSnack2());
        dayPlanDto.setDinner(RecipeMapper.toDto(dayPlan.getDinner()));

        return dayPlanDto;
    }

    public static DayPlan toEntity(DayPlanDto dayPlanDto) {
        if (dayPlanDto == null) {
            return null;
        }

        DayPlan dayPlan = new DayPlan();

        dayPlan.setBreakfast(RecipeMapper.toEntity(dayPlanDto.getBreakfast()));
        dayPlan.setSnack1(dayPlanDto.getSnack1());
        dayPlan.setLunch(RecipeMapper.toEntity(dayPlanDto.getLunch()));
        dayPlan.setSnack2(dayPlanDto.getSnack2());
        dayPlan.setDinner(RecipeMapper.toEntity(dayPlanDto.getDinner()));

        return dayPlan;
    }
}
