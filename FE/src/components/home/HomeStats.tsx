import { Card, Divider, Stack, Title } from '@mantine/core';
import { PieChart, BarChart } from '@mantine/charts';
import { dataPieChart } from './dataPieChart';
import { dataBarChart } from './dataBarChart';

const HomeStats = () => {
  return (
    <Card
      shadow="sm"
      padding="xl"
    >
      <Card.Section>
        <Title order={1}>
          Home Stats
        </Title>
        <Divider my="md" />
        <Stack align='center' >
        <PieChart withLabelsLine withTooltip labelsPosition="inside"
         labelsType="percent" withLabels data={dataPieChart} />
        <BarChart
          h={300}
          data={dataBarChart}
          dataKey="month"
          withLegend
          series={[
            { name: 'Proteine', color: 'violet.6' },
            { name: 'Glucide', color: 'blue.6' },
            { name: 'Lipide', color: 'teal.6' },
          ]}
          />
          </Stack>

      </Card.Section>


    </Card>

  );
}

export default HomeStats;