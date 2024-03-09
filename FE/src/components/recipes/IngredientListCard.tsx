import { Autocomplete, Button, Card, Divider, Group, Stack, Title } from "@mantine/core";
import { ingredients } from "./ingredients";
import React, { ChangeEvent } from "react";

const IngredientListCard = () => {
    const [ingredient, setIngredient] = React.useState<string>('');
    const [ingredientList, setIngredientList] = React.useState<string[]>([]);


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
        >
            <Card.Section>
                <Title order={1}>
                    Ingredient List
                </Title>
                <Divider my="md" />
                <Stack h={300}>
                    <div className="flex-grow">
                        {ingredientList.map((ingredient, index) => (
                            <div key={index} className="flex justify-between">
                                <p>{ingredient}</p>
                                <Button variant="light" color="red" onClick={HandleRemoveIngredient}>-</Button>
                                </div>
                        ))}
                    </div>
                    <Group gap={0}>
                    <Autocomplete
                        value={ingredient}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        className="flex-grow "
                        label=""
                        placeholder="Enter ingredient"
                        data={ingredients}
                        limit={5}
                        />
                    <Button maw={100} variant="light" color="blue" onClick={HandleAdd}>+</Button>
                        </Group>
                </Stack>
            </Card.Section>


        </Card>

    );
}

export default IngredientListCard;