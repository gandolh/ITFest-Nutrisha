import { Autocomplete, Button, Card, Divider, Group, Stack, Title } from "@mantine/core";
import { ingredients } from "./ingredients";
import React from "react";

type IngredientListCardProps = {
    ingredientList: string[];
    setIngredientList: React.Dispatch<React.SetStateAction<string[]>>;
}

const IngredientListCard = ({ingredientList,setIngredientList} : IngredientListCardProps) => {
    const [ingredient, setIngredient] = React.useState<string>('');


    const handleChange = (e : string) => {
        setIngredient(e);
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => { 
        if (e.key === 'Enter' && ingredient.length > 0) {
            HandleAdd();
        }
    }


    const HandleAdd = () => {
        if (!ingredientList.includes(ingredient))
            setIngredientList([...ingredientList, ingredient]);
    }

    const HandleRemoveIngredient = (e: React.MouseEvent<HTMLButtonElement>) => {
        const ingredient = e.currentTarget.previousSibling?.textContent;
        if (ingredient) {   
            setIngredientList(ingredientList.filter((ing) => ing !== ingredient));
        }
    }

    return (
        <Card
            shadow="sm"
            padding="xl"
            className="flex flex-col"
        >
                <div>
                <Title order={3}>
                    Ingredient List
                </Title>
                <Divider my="md" />
                </div>
                <Stack className="grow">
                    <div >
                        {ingredientList.map((ingredient, index) => (
                            <div key={index} className="flex justify-between">
                                <p>{ingredient}</p>
                                <Button variant="light" color="red" onClick={HandleRemoveIngredient}>-</Button>
                                </div>
                        ))}
                    </div>
                </Stack>


                <Group gap={0}>
                    <Autocomplete
                        value={ingredient}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="grow "
                        label=""
                        placeholder="Enter ingredient"
                        data={ingredients}
                        limit={5}
                        />
                    <Button maw={100} variant="light" color="blue" onClick={HandleAdd}>+</Button>
                </Group>


        </Card>

    );
}


export default IngredientListCard;