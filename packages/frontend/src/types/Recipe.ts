type Recipe = {
    title: string,
    description: string,
    calories: number,
    protein: number,
    fat: number,
    carbohydrate: number,
    ingredients: Ingredient[],
    steps: RecipeStep[]
}

type Ingredient = {
    name: string,
    amount: number,
}

type RecipeStep = {
    order: number,
    description: string
}