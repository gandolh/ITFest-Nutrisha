import { Card, Text, Title} from '@mantine/core';

const WelcomeCard = () => {
  const currentTime = new Date().getHours();
  let greeting;
  let background_image;
  
  if (currentTime < 13) {
    greeting = "Good morning";
    background_image = "Morning.webp";
  } else if (currentTime < 18) {
    greeting = "Good afternoon";
    background_image = "Noon.webp";
  } else {
    greeting = "Good evening";
    background_image = "Evening.webp";
  }
  

    return ( 
        <Card
        shadow="sm"
        padding="xl"
        component="div"
        className='bg-no-repeat bg-cover bg-left relative'
        style={{backgroundImage: '  linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.3)),' +
        `url("${background_image}")`}}
      >
        <h1 className='fw-bold text-white absolute bottom-[5%] mt-100 left-0 w-full text-center'
          style={{fontSize: 'calc(2rem * var(--mantine-scale))'}}>
           {greeting}
        </h1>
      </Card>

     );
}
 
export default WelcomeCard;