// Shared domain types, ported from the original Spring Boot DTOs/entities.
// Used by both @nutrisha/backend (Fastify) and @nutrisha/frontend.

export interface RecipeIngredient {
  amount: string;
  name: string;
}

export interface RecipeStep {
  order: number;
  description: string;
}

export interface Recipe {
  id?: string;
  title: string;
  description: string;
  calories: number;
  protein: number;
  fat: number;
  carbohydrate: number;
  ingredients: RecipeIngredient[] | null;
  steps: RecipeStep[] | null;
}

export interface DayPlan {
  breakfast: Recipe | null;
  snack1: string | null;
  lunch: Recipe | null;
  snack2: string | null;
  dinner: Recipe | null;
}

export type DayName =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export type MealPlan = Record<DayName, DayPlan>;

export interface User {
  id?: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  height: number | null;
  weight: number | null;
  mealPlan?: MealPlan | null;
}

// Auth request payloads (ported from AuthController inner classes)
export interface LoginRequest {
  email: string;
  password: string;
}

export interface GoogleLoginRequest {
  email: string;
  firstName: string;
  lastName: string;
}

// Stats / chart DTOs
export interface DailyBarChart {
  day: string;
  calories: number;
  protein: number;
  carbohydrate: number;
  fat: number;
}

export interface WeeklyPieChart {
  name: string;
  value: number;
}

export interface Charts {
  weeklyPieChart: WeeklyPieChart[];
  dailyBarChart: DailyBarChart[];
}

export const DAY_NAMES: DayName[] = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
];
