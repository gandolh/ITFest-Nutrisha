import { Card, Divider, Text, Title } from "@mantine/core";

const EmptyCard = () => {
    return (
        <Card
            shadow="sm"
            padding="xl"
        >
            <Title order={1} c='dimmed'> Recipe</Title>
            <Divider my="md" />
            <Text c="dimmed">Select a recipe to see its details.</Text>
        </Card>

    );
}

export default EmptyCard;