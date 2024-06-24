  import React, { useState } from 'react';
  import { Heading, Text, VStack, Input, FormControl, FormLabel, Spinner, useToast, InputRightElement, InputGroup, Button, Box } from '@chakra-ui/react';
  import ButtonComponent from '../components/ButtonComponent';
  import { Link, useNavigate } from 'react-router-dom';
  import { signup } from '../Utils/signup';
  import './AuthUi.css';

  function Signup() {
    const navigate = useNavigate();
    const toast = useToast();
    const [formData, setFormData] = useState({
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const [isLoading, setIsLoading] = useState(false);
    const [show, setShow] = React.useState(false)
    const handleChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };

    const handleSignup = async () => {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      setIsLoading(true);
      try {
        await signup(formData);

        toast({
          title: 'Account created.',
          description: "We've successfully created your account.",
          status: 'success',
          duration: 6000,
          isClosable: true,
        });

        navigate('/login');

      } catch (error) {
        toast({
          title: 'Failed to Create Account.',
          description: "Signup Failed, Please try again!.",
          status: 'warning',
          duration: 9000,
          isClosable: true,
        })
      } finally {
        setIsLoading(false);
      }
    };
    
    const handleShow = () => setShow(!show)

    return (
      <div className='container'>
        
        <Box mb={4} alignItems='flex-start'>
           <Heading >Create Account</Heading>
           <Text fontSize='xs'> Start Scheduling your tasks today with Task Buddy</Text>
        </Box>
       
        <VStack spacing={4}>
          <FormControl id='fullName' isRequired>
            <FormLabel>Full Name</FormLabel>
            <Input name='fullName' borderRadius='60px' placeholder='Full Name' value={formData.fullName} onChange={handleChange}  height='50px'  />
          </FormControl>
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
          <FormControl id='confirmPassword' isRequired>
            <FormLabel>Confirm Password</FormLabel>
            <InputGroup size='md'>
              <Input name='confirmPassword' placeholder='Confirm Password' borderRadius='60px' type={show ? 'text' : 'password'}  value={formData.confirmPassword} onChange={handleChange} height='50px' />
              <InputRightElement width='4.5rem' h='50px'>
                <Button h='1.75rem' size='sm' onClick={handleShow} borderRadius='60px' mr={2}>
                  {show ? 'Hide' : 'Show'}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>
          <ButtonComponent onClick={handleSignup}>
            {isLoading ? <Spinner size='sm' /> : 'Signup'}
          </ButtonComponent>
        </VStack>
        <Text>Have an account? <Link to='/login'>Login</Link></Text>
      </div>
    );
  }

  export default Signup;
