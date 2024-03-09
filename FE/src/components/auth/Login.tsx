import {
    Paper,
    TextInput,
    PasswordInput,
    Checkbox,
    Button,
    Title,
    Text,
    Anchor,
  } from '@mantine/core';
import classes from './Login.module.css';
import { Link } from 'react-router-dom';
import { useForm } from '@mantine/form';  
import { LoginCall } from '../../apiCallers/AuthApiCaller';


  export default function Login() { 

    const form = useForm({
      initialValues: {
        email: '',
        password: '',
        loggedIn: false,
      },
      validate: {
        email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Invalid email'),
        password: (value) => (value.length >= 8 ? null : 'Password is too short')
      },
    });

    const HandleLogin = () => {
      const output = form.validate();
      if(output.hasErrors == true) return;
      // do call
      console.log(form.values);

      LoginCall(form.values.email, form.values.password);
    }

    return (
      <div className={classes.wrapper}>
        <Paper className={classes.form} radius={0} p={30}>
          <Title order={2} className={classes.title} ta="center" mt="md" mb={50}>
            Welcome back to Nutrition-Assistant!
          </Title>
  
          <TextInput label="Email address" placeholder="hello@gmail.com" size="md" {...form.getInputProps('email')} />
          <PasswordInput label="Password" placeholder="Your password" mt="md" size="md" {...form.getInputProps('password')} />
          <Checkbox label="Keep me logged in" mt="xl" size="md" {...form.getInputProps('loggedIn')} />
          <Button fullWidth mt="xl" size="md" onClick={HandleLogin} type='button'>
            Login
          </Button>
  
          <Text ta="center" mt="md">
            Don&apos;t have an account?{' '}
            <Link to='/register'>
            <Anchor<'a'> fw={700}>
              Register
            </Anchor>
            </Link>
          </Text>
        </Paper>
      </div>
    );
  }