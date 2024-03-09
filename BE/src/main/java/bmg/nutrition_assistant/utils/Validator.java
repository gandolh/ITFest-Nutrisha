package bmg.nutrition_assistant.utils;

public class Validator {
    public static boolean isEmailValid(String email) {
        return email.matches("^[A-Za-z0-9+_.-]+@\\w+\\.[.A-Za-z]{2,3}$");
    }

    public static boolean isPasswordValid(String password) {
        return password.length() >= 8;
        // return password.matches("^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}$");
    }

    public static boolean isNameValid(String name) {
        return name != null && !name.isEmpty() && name.length() <= 30;
    }

    public static boolean isHeightValid(Integer height) {
        return height == null || (height >= 0 && height <= 300);
    }

    public static boolean isWeightValid(Integer weight) {
        return weight == null || (weight >= 0 && weight <= 300);
    }
}
