import { Card, Divider, Title } from "@mantine/core";

const EmptyCard = () => {
    return (
        <Card
            shadow="sm"
            padding="xl"
        >
            <Title order={1} c='dimmed'> Unavailable</Title>
            <Divider my="md" />
        </Card>

    );
}

export default EmptyCard;