type User = {
    id : string;
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
    breakfast: Recipe;
    lunch: string;
    dinner: Recipe;
    snack1: string;
    snack2: Recipe;
}