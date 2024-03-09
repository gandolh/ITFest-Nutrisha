import { Badge, Button, Card, Divider, List, Popover, SimpleGrid, Title } from "@mantine/core";
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
                <Title order={3}> {selectedRecipe?.title}</Title>
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
            <div className="overflow-y-auto">
                <Title order={4}>Description:</Title>
                <p>{selectedRecipe.description}</p>
                <SimpleGrid cols={2}>
                    <div className="text-center">
                        <Badge variant="filled" color="indigo" size="md" w={'100%'}>Calories:</Badge>
                        <p>{selectedRecipe.calories}</p>
                    </div>
                    <div className="text-center">
                        <Badge variant="filled" color="indigo" size="md" w={'100%'}>protein:</Badge>
                        <p>{selectedRecipe.protein}</p>
                    </div>
                    <div className="text-center">
                        <Badge variant="filled" color="indigo" size="md" w={'100%'}>fat:</Badge>
                        <p>{selectedRecipe.fat}</p>
                    </div>
                    <div className="text-center">
                        <Badge variant="filled" color="indigo" size="md" w={'100%'}>carbohydrate:</Badge>
                        <p>{selectedRecipe.carbohydrate}</p>
                    </div>
                </SimpleGrid>
                <Title order={4}>ingredients</Title>
                <div>{selectedRecipe.ingredients.map((el, index) => (
                    <p key={"recipeIngredients" + index}>{el.name} - {el.amount}</p>
                ))}</div>
                <Title order={4}>steps</Title>
                <List type="ordered" withPadding>
                    <div>{selectedRecipe.steps.map((el, index) => (
                        <List.Item key={"recipeDesc_" + index}>{el.description}</List.Item>
                    ))}</div>
                </List>
            </div>
        </Card>

    );
}

export default SelectedRecipeCard;