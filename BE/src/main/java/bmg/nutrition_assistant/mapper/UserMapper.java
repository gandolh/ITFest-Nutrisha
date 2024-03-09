package bmg.nutrition_assistant.mapper;

import bmg.nutrition_assistant.dto.UserDto;
import bmg.nutrition_assistant.entity.User;
import org.springframework.security.crypto.bcrypt.BCrypt;

public class UserMapper {
    public static UserDto toDto(User user) {
        if (user == null) {
            return null;
        }

        UserDto userDto = new UserDto();
        userDto.setId(user.getId());
        userDto.setEmail(user.getEmail());
        userDto.setPassword(user.getPassword());
        userDto.setFirstName(user.getFirstName());
        userDto.setLastName(user.getLastName());
        userDto.setHeight(user.getHeight());
        userDto.setWeight(user.getWeight());
        userDto.setMealPlan(MealPlanMapper.toDto(user.getMealPlan()));

        return userDto;
    }

    public static User toEntity(UserDto userDto) {
        if (userDto == null) {
            return null;
        }

        User user = new User();
        user.setId(userDto.getId());
        user.setEmail(userDto.getEmail());
        user.setPassword(BCrypt.hashpw(userDto.getPassword(), BCrypt.gensalt()));
        user.setFirstName(userDto.getFirstName());
        user.setLastName(userDto.getLastName());
        user.setHeight(userDto.getHeight());
        user.setWeight(userDto.getWeight());
        user.setMealPlan(MealPlanMapper.toEntity(userDto.getMealPlan()));

        return user;
    }

    public static UserDto updateDto(UserDto oldUser, UserDto newUser) {
        oldUser.setEmail(newUser.getEmail() != null ? newUser.getEmail() : oldUser.getEmail());
        oldUser.setPassword(newUser.getPassword() != null ? newUser.getPassword() : oldUser.getPassword());
        oldUser.setFirstName(newUser.getFirstName() != null ? newUser.getFirstName() : oldUser.getFirstName());
        oldUser.setLastName(newUser.getLastName() != null ? newUser.getLastName() : oldUser.getLastName());
        oldUser.setHeight(newUser.getHeight() != null ? newUser.getHeight() : oldUser.getHeight());
        oldUser.setWeight(newUser.getWeight() != null ? newUser.getWeight() : oldUser.getWeight());
        oldUser.setMealPlan(newUser.getMealPlan() != null ? newUser.getMealPlan() : oldUser.getMealPlan());

        return oldUser;
    }
}
