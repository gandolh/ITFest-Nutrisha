import { Button, Card, Divider, List, Popover, Title } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";

type SelectedRecipeCardProps = {
    selectedRecipe: Recipe;
}

const SelectedRecipeCard = ({ selectedRecipe }: SelectedRecipeCardProps) => {
    
    const ToggleModalSelectDate = () => {
        console.log('ToggleModalSelectDate');
    }
    
    return (
        <Card
            shadow="sm"
            padding="xl"
        >
            <div className="flex justify-between items-center align-middle">
            <Title order={1} > {selectedRecipe?.title}</Title>
            <Popover trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
        <Button onClick={ToggleModalSelectDate}> <IconCalendar /> Add </Button>
                </Popover.Target>
                <Popover.Dropdown>
                    Add to your prep meal
                </Popover.Dropdown>
            </Popover>
      </div>
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
            <div>{selectedRecipe.ingredients.map((el, index) => (
                <p key={"recipeIngredients" + index}>{el.name} - {el.amount}</p>
            ))}</div>
            <Title order={3}>steps</Title>
            <List type="ordered" withPadding>
                <div>{selectedRecipe.steps.map((el, index) => (
                    <List.Item key={"recipeDesc_" + index}>{el.description}</List.Item>
                ))}</div>
            </List>
        </Card>

    );
}

export default SelectedRecipeCard;