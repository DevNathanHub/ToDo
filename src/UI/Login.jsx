import React from 'react';
import './AuthUi.css';
import { Heading, Text } from '@chakra-ui/react';
import ButtonComponent from '../components/ButtonComponent';
import { Link } from 'react-router-dom';

function Login() {
    const handleLogin = () => {
        alert("Login");
    }
  return (
    <div className='container'>
        <Heading>Login</Heading>
        <ButtonComponent onClick={handleLogin}>Login</ButtonComponent>
        <Text>Don't Have an account <Link to='/signup'>Signup</Link></Text>
    </div>
  )
}

export default Login