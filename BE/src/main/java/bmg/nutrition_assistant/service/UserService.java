package bmg.nutrition_assistant.service;

import bmg.nutrition_assistant.dto.*;
import bmg.nutrition_assistant.mapper.UserMapper;
import bmg.nutrition_assistant.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;

    public List<UserDto> getAllUsers() {
        return userRepository.findAll().stream()
                .map(UserMapper::toDto)
                .collect(Collectors.toList());
    }

    public UserDto getUserById(String id) {
        return UserMapper.toDto(userRepository.findById(id).orElse(null));
    }

    public UserDto getUserByEmail(String email) {
        return UserMapper.toDto(userRepository.findByEmail(email));
    }

    public Charts getStats(UserDto userDto) {
        Charts charts = new Charts();

        MealPlanDto mealPlanDto = userDto.getMealPlan();

        DayPlanDto monday = mealPlanDto.getMonday();
        DayPlanDto tuesday = mealPlanDto.getTuesday();
        DayPlanDto wednesday = mealPlanDto.getWednesday();
        DayPlanDto thursday = mealPlanDto.getThursday();
        DayPlanDto friday = mealPlanDto.getFriday();
        DayPlanDto saturday = mealPlanDto.getSaturday();
        DayPlanDto sunday = mealPlanDto.getSunday();

        List<DailyBarChart> dailyBarChart = List.of(
                new DailyBarChart("Monday", monday.calculateTotalCalories(), monday.calculateTotalProtein(), monday.calculateTotalCarbohydrate(), monday.calculateTotalFat()),
                new DailyBarChart("Tuesday", tuesday.calculateTotalCalories(), tuesday.calculateTotalProtein(), tuesday.calculateTotalCarbohydrate(), tuesday.calculateTotalFat()),
                new DailyBarChart("Wednesday", wednesday.calculateTotalCalories(), wednesday.calculateTotalProtein(), wednesday.calculateTotalCarbohydrate(), wednesday.calculateTotalFat()),
                new DailyBarChart("Thursday", thursday.calculateTotalCalories(), thursday.calculateTotalProtein(), thursday.calculateTotalCarbohydrate(), thursday.calculateTotalFat()),
                new DailyBarChart("Friday", friday.calculateTotalCalories(), friday.calculateTotalProtein(), friday.calculateTotalCarbohydrate(), friday.calculateTotalFat()),
                new DailyBarChart("Saturday", saturday.calculateTotalCalories(), saturday.calculateTotalProtein(), saturday.calculateTotalCarbohydrate(), saturday.calculateTotalFat()),
                new DailyBarChart("Sunday", sunday.calculateTotalCalories(), sunday.calculateTotalProtein(), sunday.calculateTotalCarbohydrate(), sunday.calculateTotalFat())
        );

        charts.setDailyBarChart(dailyBarChart);

        List<WeeklyPieChart> weeklyPieChart = List.of(
                new WeeklyPieChart("Calories", dailyBarChart.stream().mapToInt(DailyBarChart::getCalories).sum()),
                new WeeklyPieChart("Protein", dailyBarChart.stream().mapToInt(DailyBarChart::getProtein).sum()),
                new WeeklyPieChart("Carbohydrate", dailyBarChart.stream().mapToInt(DailyBarChart::getCarbohydrate).sum()),
                new WeeklyPieChart("Fat", dailyBarChart.stream().mapToInt(DailyBarChart::getFat).sum())
        );

        charts.setWeeklyPieChart(weeklyPieChart);

        return charts;
    }

    public UserDto saveNewUser(UserDto userDto) {
        MealPlanDto mealPlanDto = new MealPlanDto();

        mealPlanDto.setMonday(new DayPlanDto(null, null, null, null, null));
        mealPlanDto.setTuesday(new DayPlanDto(null, null, null, null, null));
        mealPlanDto.setWednesday(new DayPlanDto(null, null, null, null, null));
        mealPlanDto.setThursday(new DayPlanDto(null, null, null, null, null));
        mealPlanDto.setFriday(new DayPlanDto(null, null, null, null, null));
        mealPlanDto.setSaturday(new DayPlanDto(null, null, null, null, null));
        mealPlanDto.setSunday(new DayPlanDto(null, null, null, null, null));

        userDto.setMealPlan(mealPlanDto);

        return UserMapper.toDto(userRepository.save(UserMapper.toEntity(userDto)));
    }

    public UserDto saveUser(UserDto userDto) {
        return UserMapper.toDto(userRepository.save(UserMapper.toEntity(userDto)));
    }

    public void deleteUser(String id) {
        userRepository.deleteById(id);
    }

    public UserDto updateUser(String id, UserDto userDto) {
        return saveUser(UserMapper.updateDto(getUserById(id), userDto));
    }
}
