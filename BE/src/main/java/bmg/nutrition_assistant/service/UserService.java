package bmg.nutrition_assistant.service;

import bmg.nutrition_assistant.dto.UserDto;
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
