import { Container, SimpleGrid } from "@mantine/core";
import WelcomeCard from "./WelcomeCard";
import HomeStats from "./HomeStats";
import TodayPlan from "./TodayPlan";


const Home = () => {
  return (

     <Container size='xl' pt={30}>
      <SimpleGrid cols={3}>
        <WelcomeCard/>
        <TodayPlan/>
        <HomeStats/>
      </SimpleGrid>
    </Container>
  );
}

export default Home;