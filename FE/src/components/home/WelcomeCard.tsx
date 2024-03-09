import { Card, Text, Title} from '@mantine/core';

const WelcomeCard = () => {
  const currentTime = new Date().getHours();
  let greeting;
  
  if (currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }
  

    return ( 
        <Card
        shadow="sm"
        padding="xl"
        component="div"
        className='bg-no-repeat bg-cover bg-center relative'
        style={{backgroundImage: '  linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.5)),' +
        'url("welcomeCardImg2.jpg")'}}
      >
        <h1 className='fw-bold text-white absolute bottom-[5%] mt-100 left-0 w-full text-center'
          style={{fontSize: 'calc(2rem * var(--mantine-scale))'}}>
           {greeting}
        </h1>
      </Card>

     );
}
 
export default WelcomeCard;