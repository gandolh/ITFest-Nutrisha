package bmg.nutrition_assistant.controller;

import bmg.nutrition_assistant.dto.UserDto;
import bmg.nutrition_assistant.service.UserService;
import bmg.nutrition_assistant.utils.Validator;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {
    private final UserService userService;

    @Getter
    public static class LoginRequest {
        private String email;
        private String password;
    }

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody LoginRequest loginRequest) {
        UserDto userDto = userService.getUserByEmail(loginRequest.getEmail());

        if (userDto == null) {
            return ResponseEntity.notFound().build();
        }

        if (!BCrypt.checkpw(loginRequest.getPassword(), userDto.getPassword())) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(userDto);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody UserDto userDto) {
        if (!Validator.isEmailValid(userDto.getEmail()) && !Validator.isPasswordValid(userDto.getPassword()) && !Validator.isNameValid(userDto.getFirstName()) && !Validator.isNameValid(userDto.getLastName()) && !Validator.isHeightValid(userDto.getHeight()) && !Validator.isWeightValid(userDto.getWeight())) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(userService.saveUser(userDto));
    }
}
