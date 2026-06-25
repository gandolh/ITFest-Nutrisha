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
    breakfast: Recipe | null;
    lunch: Recipe | null;
    dinner: Recipe | null;
    snack1: string | null;
    snack2: string | null;
}