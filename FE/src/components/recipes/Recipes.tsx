import { Container, SimpleGrid } from "@mantine/core";
import IngredientListCard from "./IngredientListCard";
import RecipesCard from "./RecipesCard";

const Recipes = () => {
    return (<h1>
        <Container size='xl' pt={30}>
            <SimpleGrid cols={2}>
                <IngredientListCard />
                <RecipesCard />
            </SimpleGrid>
        </Container>
    </h1>);
}

export default Recipes;