// Ported from utils/Validator.java
export const Validator = {
  isEmailValid(email: string): boolean {
    return /^[A-Za-z0-9+_.-]+@\w+\.[.A-Za-z]{2,3}$/.test(email);
  },

  isPasswordValid(password: string): boolean {
    return password.length >= 8;
  },

  isNameValid(name: string | null | undefined): boolean {
    return name != null && name.length > 0 && name.length <= 30;
  },

  isHeightValid(height: number | null | undefined): boolean {
    return height == null || (height >= 0 && height <= 300);
  },

  isWeightValid(weight: number | null | undefined): boolean {
    return weight == null || (weight >= 0 && weight <= 300);
  },
};
