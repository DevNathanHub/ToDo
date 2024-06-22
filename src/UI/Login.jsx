import React, { useState } from 'react';
import { Heading, Text, VStack, Input, FormControl, FormLabel, Spinner, useToast } from '@chakra-ui/react';
import ButtonComponent from '../components/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Auth/login';
import './AuthUi.css';
import { useUser } from '../context/UserContext';

function Login() {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const {setUser, setToken} = useUser();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const { token, user } = await login(formData);
      console.log("token and user", token, user)
       setToken(token);
       setUser(user);

      toast({
        title: 'Success .',
        description: "Logged in successfully!",
        status: 'success',
        duration: 9000,
        isClosable: true,
      });
      navigate('/todos');
    } catch (error) {
      toast({
        title: 'Error .',
        description: "Failed to login!",
        status: 'error',
        duration: 9000,
        isClosable: true,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='container'>
      <Heading>Login</Heading>
      <VStack spacing={4}>
        <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input name='email' type='email' value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input name='password' type='password' value={formData.password} onChange={handleChange} />
        </FormControl>
        <ButtonComponent onClick={handleLogin}>
          {isLoading ? <Spinner size='sm' /> : 'Login'}
        </ButtonComponent>
      </VStack>
      <Text>Don't have an account? <Link to='/signup'>Signup</Link></Text>
    </div>
  );
}

export default Login;
