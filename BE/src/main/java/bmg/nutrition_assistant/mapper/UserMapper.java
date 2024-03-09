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

        return user;
    }

    public static UserDto updateDto(UserDto existingUser, UserDto modifiedUser) {
        existingUser.setEmail(modifiedUser.getEmail() != null ? modifiedUser.getEmail() : existingUser.getEmail());
        existingUser.setPassword(modifiedUser.getPassword() != null ? modifiedUser.getPassword() : existingUser.getPassword());
        existingUser.setFirstName(modifiedUser.getFirstName() != null ? modifiedUser.getFirstName() : existingUser.getFirstName());
        existingUser.setLastName(modifiedUser.getLastName() != null ? modifiedUser.getLastName() : existingUser.getLastName());
        existingUser.setHeight(modifiedUser.getHeight() != null ? modifiedUser.getHeight() : existingUser.getHeight());
        existingUser.setWeight(modifiedUser.getWeight() != null ? modifiedUser.getWeight() : existingUser.getWeight());

        return existingUser;
    }
}
