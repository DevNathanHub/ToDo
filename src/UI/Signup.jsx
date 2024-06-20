import React from 'react';
import './AuthUi.css';
import { Heading, Text } from '@chakra-ui/react';
import ButtonComponent from '../components/ButtonComponent';
import { Link } from 'react-router-dom';

function Signup() {
    const handleSignup = () => {
        alert("signup");
    }
  return (
    <div className='container'>
        <Heading>Signup</Heading>
        <ButtonComponent onClick={handleSignup}>Signup</ButtonComponent>
        <Text>Have an account <Link to='/login'>Login</Link></Text>

    </div>
  )
}

export default Signup