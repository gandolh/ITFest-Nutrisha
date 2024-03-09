import { Container, SimpleGrid } from "@mantine/core";
import IngredientListCard from "./IngredientListCard";
import RecipesCard from "./RecipesCard";
import ChatAssistant from "./ChatAssistant";

const Recipes = () => {
    return (<h1>
        <Container fluid pt={30} className="flex flex-col items-center justify-center"  style={{height: 'calc(100dvh - 60px - var(--app-shell-padding))'}}>
            <SimpleGrid cols={2} className="w-full">
                <IngredientListCard />
                <RecipesCard />
            </SimpleGrid>
            <ChatAssistant/>
        </Container>
    </h1>);
}

export default Recipes;