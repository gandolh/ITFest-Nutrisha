import { Badge, Button, Card, Divider, List, Checkbox, SimpleGrid, Title, Modal, Table } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { useAuthContext } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { toTitleCase } from "../../utils/helpers";
import { updateUser } from "./RecipesApiCallers";

type SelectedRecipeCardProps = {
    selectedRecipe: Recipe;
}

const SelectedRecipeCard = ({ selectedRecipe }: SelectedRecipeCardProps) => {
    const [opened, { open, close }] = useDisclosure(false);
    // breakfast, Lunch, Dinner -> Recipe
    // Snack 1, Snack 2 -> string

    return (
        <>
            <Card
                shadow="sm"
                padding="xl"
            >
                <div className="flex justify-between items-center align-middle">
                    <Title order={3} className="w-48"> {toTitleCase(selectedRecipe?.title.toLowerCase())}</Title>
                    <Button onClick={open}> <IconCalendar /> Add </Button>
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
                    <Title order={4}>Ingredients</Title>
                    <List className="list-disc w-64">{selectedRecipe.ingredients.map((el, index) => (
                        <List.Item key={"recipeIngredients" + index}>{el.amount} {el.name}</List.Item>
                    ))}</List>
                    <Title order={4}>Steps</Title>
                    <List type="ordered" className="list-decimal w-64">
                        {selectedRecipe.steps.map((el, index) => (
                            <List.Item key={"recipeDesc_" + index}>{el.description}</List.Item>
                        ))}
                    </List>
                </div>
            </Card>
            <Modal opened={opened} onClose={close} title="Meal Planner" size={"lg"} centered>
                <MealPlanTable selectedRecipe={selectedRecipe} />

            </Modal>
        </>
    );
}


const days: string[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const meals: string[] = ['Breakfast', 'Lunch', 'Dinner'];

type MealPlanTableProps = {
    selectedRecipe: Recipe;
}

const MealPlanTable = ({ selectedRecipe }: MealPlanTableProps) => {


    const { curentUser, setCurentUser } = useAuthContext();
    const [checkedItems, setCheckedItems] = useState<{ [key: string]: boolean }>({});

    useEffect(() => {
        const newCheckedItems = { ...checkedItems };
        if (curentUser?.mealPlan) {
            const days = Object.keys(curentUser.mealPlan);
            const meals = Object.keys(curentUser.mealPlan[days[0]]);
            days.forEach(day => {
                meals.forEach(meal => {
                    //@ts-ignore
                    const recipe = curentUser.mealPlan[day][meal];
                    if (recipe === null || recipe === undefined)
                        newCheckedItems[`${meal}-${day}`] = false;
                    else if (recipe === selectedRecipe)
                        newCheckedItems[`${meal}-${day}`] = false;
                    else {
                        // is other
                        newCheckedItems[`${meal}-${day}`] = true;
                    }
                });
            });
        }

        setCheckedItems(newCheckedItems);
    }, [curentUser]);

    const handleChange = (meal: string, day: string) => {
        const newCheckedItems = { ...checkedItems };
        newCheckedItems[`${meal}-${day}`] = !checkedItems[`${meal}-${day}`];
        setCheckedItems(newCheckedItems);
    };
    
    function deepCopy(obj : any) {
        return JSON.parse(JSON.stringify(obj));
      }
      

    const HandlePrepareMeal = () => {
        const selectedDays = Object.keys(checkedItems).filter(key => checkedItems[key]);
        const splittedArr = selectedDays.map(day => day.split("-"));
        //@ts-ignore
        const newMealPlan = deepCopy(curentUser.mealPlan);
        for( let [meal,day] of splittedArr){
            day = day.toLowerCase();
            meal = meal.toLowerCase();
            newMealPlan[day][meal] = selectedRecipe;
        }
        const newUser = {...curentUser!, mealPlan: newMealPlan};
        setCurentUser(newUser);
        updateUser(newUser).then((user) => {
            if (user) {
                setCurentUser(user);
            } else {
                console.error("User not updated");
            }
        });


    }

    return (
        <>
            <table>
                <thead>
                    <tr>
                        <th></th>
                        {days.map(day => (
                            <th key={day}>{day}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {meals.map(meal => (
                        <tr key={meal}>
                            <td>{meal}</td>
                            {days.map(day => (
                                <td key={`${meal}-${day}`}>
                                    <input
                                        type="checkbox"
                                        checked={checkedItems[`${meal}-${day}`] || false}
                                        onChange={() => handleChange(meal, day)}
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
            <Button fullWidth variant="filled" color="blue" mt={6} onClick={() => HandlePrepareMeal()}>Save</Button>
        </>
    );
};



export default SelectedRecipeCard;