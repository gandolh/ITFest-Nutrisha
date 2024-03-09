import { Container, SimpleGrid } from "@mantine/core";
import IngredientListCard from "./IngredientListCard";
import RecipesCard from "./RecipesCard";
import ChatAssistant from "./ChatAssistant";
import EmptyCard from "./EmptyCard";
import React from "react";
import SelectedRecipeCard from "./SelectedRecipeCard";


const mockupRecipes = [
    {
            title: 'Recipe 1',
            description: 'Description 1',
            calorie: 100,
            protein: 10,
            fat: 10,
            carbohydrate: 10,
            ingredients: [
                {
                    name: 'Ingredient 1',
                    amount: 10
                }
            ],
            steps: [
                {
                    order: 1,
                    description: 'Step 1'
                }
            ]
        },
        {
            title: 'Recipe 2',
            description: 'Description 2',
            calorie: 200,
            protein: 20,
            fat: 20,
            carbohydrate: 20,
            ingredients: [
                {
                    name: 'Ingredient 2',
                    amount: 20
                }
            ],
            steps: [
                {
                    order: 1,
                    description: 'Step 1'
                }
            ]
        },
        {
            title: 'Recipe 3',
            description: 'Description 3',
            calorie: 300,
            protein: 30,
            fat: 30,
            carbohydrate: 30,
            ingredients: [
                {
                    name: 'Ingredient 3',
                    amount: 30
                }
            ],
            steps: [
                {
                    order: 1,
                    description: 'Step 1'
                }
            ]
        }
    ];

const Recipes = () => {
    const [ingredientList, setIngredientList] = React.useState<string[]>([]);
    const [recipes, setRecipes] = React.useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(null);

    const HandleSearchRecipes = () => {
        setRecipes(mockupRecipes);
    }

    
    return (<h1>
        <Container fluid pt={30} className="flex flex-col items-center justify-center"  style={{height: 'calc(100dvh - 60px - var(--app-shell-padding))'}}>
            <SimpleGrid h={550} cols={3} className="w-full">
                <IngredientListCard ingredientList={ingredientList} setIngredientList={setIngredientList}/> 
                <RecipesCard 
                 OnSearchRecipes={HandleSearchRecipes} 
                 recipes={recipes} selectedRecipe={selectedRecipe} 
                 setSelectedRecipe={setSelectedRecipe} />
                {selectedRecipe === null ? <EmptyCard /> : <SelectedRecipeCard selectedRecipe={selectedRecipe} />}
             </SimpleGrid>
            <ChatAssistant/>
        </Container>
    </h1>);
}

export default Recipes;