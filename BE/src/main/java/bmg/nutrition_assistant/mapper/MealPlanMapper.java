package bmg.nutrition_assistant.mapper;

import bmg.nutrition_assistant.dto.MealPlanDto;
import bmg.nutrition_assistant.entity.MealPlan;

public class MealPlanMapper {
    public static MealPlanDto toDto(MealPlan mealPlan) {
        MealPlanDto mealPlanDto = new MealPlanDto();

        mealPlanDto.setMonday(DayPlanMapper.toDto(mealPlan.getMonday()));
        mealPlanDto.setTuesday(DayPlanMapper.toDto(mealPlan.getTuesday()));
        mealPlanDto.setWednesday(DayPlanMapper.toDto(mealPlan.getWednesday()));
        mealPlanDto.setThursday(DayPlanMapper.toDto(mealPlan.getThursday()));
        mealPlanDto.setFriday(DayPlanMapper.toDto(mealPlan.getFriday()));
        mealPlanDto.setSaturday(DayPlanMapper.toDto(mealPlan.getSaturday()));
        mealPlanDto.setSunday(DayPlanMapper.toDto(mealPlan.getSunday()));

        return mealPlanDto;
    }

    public static MealPlan toEntity(MealPlanDto mealPlanDto) {
        MealPlan mealPlan = new MealPlan();

        mealPlan.setMonday(DayPlanMapper.toEntity(mealPlanDto.getMonday()));
        mealPlan.setTuesday(DayPlanMapper.toEntity(mealPlanDto.getTuesday()));
        mealPlan.setWednesday(DayPlanMapper.toEntity(mealPlanDto.getWednesday()));
        mealPlan.setThursday(DayPlanMapper.toEntity(mealPlanDto.getThursday()));
        mealPlan.setFriday(DayPlanMapper.toEntity(mealPlanDto.getFriday()));
        mealPlan.setSaturday(DayPlanMapper.toEntity(mealPlanDto.getSaturday()));
        mealPlan.setSunday(DayPlanMapper.toEntity(mealPlanDto.getSunday()));

        return mealPlan;
    }
}
