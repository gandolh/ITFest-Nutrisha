import { Card, Divider, Title } from "@mantine/core";


const RecipesCard = () => {
    return ( 
        <Card
        shadow="sm"
        padding="xl"
      >
        <Card.Section>
          <Title order={1}>
            Found Recipes
          </Title>
          <Divider my="md" />
        
        </Card.Section>
  
  
      </Card>
     );
}
 
export default RecipesCard;