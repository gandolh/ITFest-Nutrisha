import { Card, Divider, List, ListItem, Title } from '@mantine/core';


const TodayPlan = () => {
    return ( 
      <Card
      shadow="sm"
      padding="xl"
    >
        <Title order={1}>
          Today's Plan
        </Title>
        <Divider my="md" />
        <List withPadding>
          <List.Item>Breakfast
            <List withPadding>
              <ListItem>Cereal</ListItem>
            </List>
          </List.Item>
          <List.Item>Lunch
            <List withPadding>
              <ListItem>Steak</ListItem>
            </List></List.Item>

          <List.Item>Dinner
            <List withPadding>
              <ListItem>Sleep 😊</ListItem>
            </List></List.Item>
        </List>


    </Card>

     );
}
 
export default TodayPlan;