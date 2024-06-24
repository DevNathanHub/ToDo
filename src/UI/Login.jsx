import React, { useEffect, useState } from 'react';
import { Heading, Text, VStack, Input, FormControl, FormLabel, Spinner, useToast, InputGroup, InputRightElement, Button, Box } from '@chakra-ui/react';
import ButtonComponent from '../components/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../Utils/login';
import './AuthUi.css';
import { useUser } from '../context/UserContext';
import ImageContainer from '../components/ImageContainer';
import { handleRedirect } from '../Utils/redirect';
import { FaArrowLeftLong } from "react-icons/fa6";
import { color } from 'framer-motion';

function Login() {
  const navigate = useNavigate();
  const toast = useToast();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const {setUser, setToken} = useUser();
  const [show, setShow] = React.useState(false)

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

  const handleShow = () => setShow(!show)

  useEffect(() => {
    handleRedirect(navigate);
  }, []);

  return (
    <div className='container'>
      <Box onClick={() => {navigate('/')}} cursor='pointer' fontSize='30px' color='#A06312'>
        <FaArrowLeftLong/>
      </Box>
      <Box width='100%'>
          <ImageContainer />
      </Box>
      
     
      
      <Heading mb={2}>Login</Heading>
      <VStack spacing={2}>
        <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input name='email' placeholder='Email' type='email' borderRadius='60px' value={formData.email} onChange={handleChange}  height='50px'  />
        </FormControl>
        <FormControl id='password' isRequired>
        <FormLabel>Password</FormLabel>
          
          <InputGroup size='md'>
            <Input name='password' placeholder='Password' borderRadius='60px' type={show ? 'text' : 'password'}  value={formData.password} onChange={handleChange}  height='50px' />
            <InputRightElement width='4.5rem' h='50px' >
              <Button h='1.75rem' size='sm' onClick={handleShow} borderRadius='60px' mr={2}>
                {show ? 'Hide' : 'Show'}
              </Button>
            </InputRightElement>
          </InputGroup>
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
