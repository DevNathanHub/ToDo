import React, { useState } from 'react';
import { Heading, Text, VStack, Input, FormControl, FormLabel, Spinner, useToast } from '@chakra-ui/react';
import ButtonComponent from '../components/ButtonComponent';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../Auth/signup';
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

  return (
    <div className='container'>
      <Heading>Signup</Heading>
      <VStack spacing={4}>
        <FormControl id='fullName' isRequired>
          <FormLabel>Full Name</FormLabel>
          <Input name='fullName' value={formData.fullName} onChange={handleChange} />
        </FormControl>
        <FormControl id='email' isRequired>
          <FormLabel>Email</FormLabel>
          <Input name='email' type='email' value={formData.email} onChange={handleChange} />
        </FormControl>
        <FormControl id='password' isRequired>
          <FormLabel>Password</FormLabel>
          <Input name='password' type='password' value={formData.password} onChange={handleChange} />
        </FormControl>
        <FormControl id='confirmPassword' isRequired>
          <FormLabel>Confirm Password</FormLabel>
          <Input name='confirmPassword' type='password' value={formData.confirmPassword} onChange={handleChange} />
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
