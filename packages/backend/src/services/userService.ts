import bcrypt from 'bcryptjs';
import type {
  User,
  Charts,
  DailyBarChart,
  DayPlan,
  MealPlan,
} from '@nutrisha/shared';
import { DAY_NAMES } from '@nutrisha/shared';
import { userRepository } from '../repositories.js';

// Ported from MealPlanMapper/UserMapper toEntity: the password is hashed when
// persisting. We hash on save, exactly like the original BCrypt mapper did.
function hashForStorage(user: User): User {
  return { ...user, password: bcrypt.hashSync(user.password ?? '', bcrypt.genSaltSync()) };
}

function emptyDayPlan(): DayPlan {
  return { breakfast: null, snack1: null, lunch: null, snack2: null, dinner: null };
}

// Ported from DayPlanDto.calculateTotal* (only breakfast/lunch/dinner counted)
function sumMacro(day: DayPlan, macro: 'calories' | 'protein' | 'carbohydrate' | 'fat'): number {
  let total = 0;
  if (day.breakfast) total += day.breakfast[macro];
  if (day.lunch) total += day.lunch[macro];
  if (day.dinner) total += day.dinner[macro];
  return total;
}

export const userService = {
  getAllUsers(): Promise<User[]> {
    return userRepository.findAll();
  },

  getUserById(id: string): Promise<User | null> {
    return userRepository.findById(id);
  },

  getUserByEmail(email: string): Promise<User | null> {
    return userRepository.findByEmail(email);
  },

  getStats(userDto: User): Charts {
    const mealPlan = userDto.mealPlan as MealPlan;

    const dailyBarChart: DailyBarChart[] = DAY_NAMES.map((day) => {
      const plan = mealPlan[day];
      return {
        day: day.charAt(0).toUpperCase() + day.slice(1),
        calories: sumMacro(plan, 'calories'),
        protein: sumMacro(plan, 'protein'),
        carbohydrate: sumMacro(plan, 'carbohydrate'),
        fat: sumMacro(plan, 'fat'),
      };
    });

    const sum = (key: keyof DailyBarChart) =>
      dailyBarChart.reduce((acc, d) => acc + (d[key] as number), 0);

    return {
      dailyBarChart,
      weeklyPieChart: [
        { name: 'Calories', value: sum('calories') },
        { name: 'Protein', value: sum('protein') },
        { name: 'Carbohydrate', value: sum('carbohydrate') },
        { name: 'Fat', value: sum('fat') },
      ],
    };
  },

  // Ported from UserService.saveNewUser: seeds an empty week-long meal plan.
  saveNewUser(userDto: User): Promise<User> {
    const mealPlan = Object.fromEntries(
      DAY_NAMES.map((day) => [day, emptyDayPlan()]),
    ) as MealPlan;
    return userRepository.save(hashForStorage({ ...userDto, mealPlan }));
  },

  saveUser(userDto: User): Promise<User> {
    return userRepository.save(hashForStorage(userDto));
  },

  deleteUser(id: string): Promise<void> {
    return userRepository.deleteById(id);
  },

  // Ported from UserMapper.updateDto: non-null fields from newUser override.
  async updateUser(id: string, newUser: Partial<User>): Promise<User> {
    const oldUser = (await userRepository.findById(id))!;
    const merged: User = {
      ...oldUser,
      email: newUser.email ?? oldUser.email,
      password: newUser.password ?? oldUser.password,
      firstName: newUser.firstName ?? oldUser.firstName,
      lastName: newUser.lastName ?? oldUser.lastName,
      height: newUser.height ?? oldUser.height,
      weight: newUser.weight ?? oldUser.weight,
      mealPlan: newUser.mealPlan ?? oldUser.mealPlan,
    };
    return this.saveUser(merged);
  },
};
