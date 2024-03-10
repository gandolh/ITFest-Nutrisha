import { Card, Divider, Stack, Title } from '@mantine/core';
import { PieChart, BarChart } from '@mantine/charts';
import { dataPieChart } from './dataPieChart';
import { dataBarChart } from './dataBarChart';
import { GetStats } from './HomeApiCaller';
import { useAuthContext } from '../auth/AuthContext';
import { useEffect, useState } from 'react';

const HomeStats = () => {

  const {curentUser} = useAuthContext();
  const [stats, setStats] = useState<any>();
  useEffect(() => {
    if(curentUser !== null)
     setStats(GetStats(curentUser));
  }, [curentUser]);


  return (
    <Card
      shadow="sm"
      padding="xl"
    >
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



    </Card>

  );
}

export default HomeStats;