import { Card, Divider, List, Title } from "@mantine/core";

type SelectedRecipeCardProps = {
    selectedRecipe: Recipe;
}

const SelectedRecipeCard = ({ selectedRecipe }: SelectedRecipeCardProps) => {
    return (
        <Card
            shadow="sm"
            padding="xl"
        >
            <Title order={1} > {selectedRecipe?.title}</Title>
            <Divider my="md" />
            <Title order={3}>Description:</Title>
            <p>{selectedRecipe.description}</p>
            <Title order={3}>Calories:</Title>
            <p>{selectedRecipe.calorie}</p>
            <Title order={3}>protein</Title>
            <p>{selectedRecipe.protein}</p>
            <Title order={3}>fat</Title>
            <p>{selectedRecipe.fat}</p>
            <Title order={3}>carbohydrate</Title>
            <p>{selectedRecipe.carbohydrate}</p>
            <Title order={3}>ingredients</Title>
            <p>{selectedRecipe.ingredients.map(el => (
                <p>{el.name} - {el.amount}</p>
            ))}</p>
            <Title order={3}>steps</Title>
            <List type="ordered" withPadding>
                <p>{selectedRecipe.steps.map(el => (
                    <List.Item>{el.description}</List.Item>
                ))}</p>
            </List>
        </Card>

    );
}

export default SelectedRecipeCard;