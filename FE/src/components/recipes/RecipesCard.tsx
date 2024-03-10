import { Button, Card, Divider, Stack, Title, Text } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";
import { toTitleCase } from "../../utils/helpers";

type RecipesCardProps = {
  OnSearchRecipes: () => void;
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  setSelectedRecipe: React.Dispatch<React.SetStateAction<Recipe | null>>;
}


const RecipesCard = ({ OnSearchRecipes, recipes, selectedRecipe, setSelectedRecipe }: RecipesCardProps) => {
  const activeClass = "border bg-indigo-600 rounded p-2 text-white ";
  const inactiveClass = "border border-gray-200 rounded p-2";
  return (
    <Card
      shadow="sm"
      padding="xl"
    >
      <div className="flex justify-between items-center align-middle">
        <Title order={3}>
          Found Recipes
        </Title>
        <Button onClick={OnSearchRecipes} color="indigo"> <IconSearch/> Search </Button>
      </div>
      <Divider my="md" />
      <Stack className="grow overflow-y-auto pr-[4px]">
        {recipes.map((recipe, index) => (
          <div key={index} className={"border border-gray-200 rounded p-2 " +
            (recipe === selectedRecipe ? activeClass : inactiveClass)}
            onClick={() => setSelectedRecipe(recipe)}
            >
            <p>{toTitleCase(recipe.title)}</p>
            <Text lineClamp={2} c="dimmed">
              {recipe.description}
              
            </Text>
          </div>
        ))}
      </Stack>

    </Card>
  );
}

export default RecipesCard;