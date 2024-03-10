type User = {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    weight: number | null;
    height: number | null;
    mealPlan: MealPlan;
}



type MealPlan = {
    [key: string]: MealPlanDay;
}


type MealPlanDay = {
    breakfast: string;
    lunch: string;
    dinner: string;
    snack1: string;
    snack2: string;
}