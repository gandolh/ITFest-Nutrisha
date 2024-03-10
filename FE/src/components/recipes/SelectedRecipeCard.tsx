import { Badge, Button, Card, Divider, List, Checkbox, SimpleGrid, Title, Modal, Table } from "@mantine/core";
import { IconCalendar } from "@tabler/icons-react";
import { useDisclosure } from '@mantine/hooks';
import { useAuthContext } from "../auth/AuthContext";
import { useEffect, useState } from "react";
import { toTitleCase } from "../../utils/helpers";

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
            <Modal opened={opened} onClose={close} title="Meal Planner" size={"xl"} centered>
                <MealPlanTable selectedRecipe={selectedRecipe}/>

            </Modal>
        </>
    );
}


type MealPlanTableProps = {
    selectedRecipe: Recipe;
}

enum MealSlot {
    Nothing, 
    SameAsCurrent,
    Other
}

const MealPlanTable = ({selectedRecipe} : MealPlanTableProps) => {
    const {curentUser} = useAuthContext();
    const [mealPlan, setMealPlan] = useState<MealPlan | null>();
    useEffect(() => {
        setMealPlan(curentUser?.mealPlan);
    }, [curentUser]);
  
    const getStatus = (day : string, meal : string) : MealSlot => {
        //@ts-ignore
            const valueOnMeal = mealPlan[day.toLowerCase()][meal.toLowerCase()];
            const elementExists = valueOnMeal  === null ? false : true;
            if(!elementExists) return MealSlot.Nothing;
            else if(valueOnMeal === selectedRecipe) return MealSlot.SameAsCurrent;
            else return MealSlot.Other;

    }

    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    const HandleAddToMeal = () => {
        console.log("Add to meal plan")        
    }

    const handleChange = (day : string, meal : string, slot: MealSlot) => {
        const newMealPlan = {...mealPlan};
        if(slot === MealSlot.Nothing || slot === MealSlot.Other) {
            //@ts-ignore
            newMealPlan[day.toLowerCase()][meal.toLowerCase()] = selectedRecipe;
        }
        else {
            //@ts-ignore
            newMealPlan[day.toLowerCase()][meal.toLowerCase()] = null;
        }
        setMealPlan(newMealPlan);
    }

    const rows = meals.map((meal) => (
        <Table.Tr key={"tableMeal_" + meal}>
            <Table.Td>{meal}</Table.Td>
            {days.map((day, index) => (
                <Table.Td key={"tableMeal_" + meal + "_day_" + day + "_" + index}>
                    <CheckBoxes status={getStatus(day,meal)} handleChange={handleChange} day={day} meal={meal} />
                </Table.Td>
            ))}
        </Table.Tr>
    ));
    return (
        <>
        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    {days.map((day, index) => (
                        <Table.Th key={`tableday_${day}_${index}`}>{day}</Table.Th>
                    ))}
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows}
            </Table.Tbody>
        </Table>
        <Button mt={10} variant="filled" style={{ width: '100%' }} onClick={HandleAddToMeal}>Add to meal plan</Button>
        </>
    );
};


type CheckboxesProps = {
    status: MealSlot;
    handleChange: (day: string, meal: string, slot: MealSlot) => void;
    day: string;
    meal: string;
}

const CheckBoxes = ({status, handleChange,day, meal }: CheckboxesProps) => {


    return (   
        <>
        { status === MealSlot.Nothing ? <Checkbox checked={false} onChange={()=> handleChange(day,meal, MealSlot.Nothing)} /> : null}
    {status === MealSlot.Other ? <Checkbox color="violet" checked={true} onChange={()=> handleChange(day,meal, MealSlot.Other)}/> : null}
    {status === MealSlot.SameAsCurrent ? <Checkbox  checked={true} onChange={()=> handleChange(day,meal, MealSlot.SameAsCurrent)}/> : null}
        </>
     )
}

export default SelectedRecipeCard;