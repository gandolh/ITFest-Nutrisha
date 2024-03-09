import { Container, SimpleGrid } from "@mantine/core";
import IngredientListCard from "./IngredientListCard";
import RecipesCard from "./RecipesCard";
import ChatAssistant from "./ChatAssistant";
import EmptyCard from "./EmptyCard";
import React from "react";
import SelectedRecipeCard from "./SelectedRecipeCard";
import { getRecipesByIngredients } from "./RecipesApiCallers";



const Recipes = () => {
    const [ingredientList, setIngredientList] = React.useState<string[]>([]);
    const [recipes, setRecipes] = React.useState<Recipe[]>([]);
    const [selectedRecipe, setSelectedRecipe] = React.useState<Recipe | null>(null);

    const HandleSearchRecipes = () => {
        getRecipesByIngredients(ingredientList).then(recipes => {
            setRecipes(recipes);
        })
    }


    return (<h1>
        <Container fluid pt={30} className="flex flex-col items-center justify-center" style={{ height: 'calc(100dvh - 60px - var(--app-shell-padding))' }}>
            <SimpleGrid cols={3} className="w-full h-[80dvh]">
                <IngredientListCard ingredientList={ingredientList} setIngredientList={setIngredientList} />
                <RecipesCard
                    OnSearchRecipes={HandleSearchRecipes}
                    recipes={recipes} selectedRecipe={selectedRecipe}
                    setSelectedRecipe={setSelectedRecipe} />
                {selectedRecipe === null ? <EmptyCard /> : <SelectedRecipeCard selectedRecipe={selectedRecipe} />}
            </SimpleGrid>
            <ChatAssistant />
        </Container>
    </h1>);
}

export default Recipes;