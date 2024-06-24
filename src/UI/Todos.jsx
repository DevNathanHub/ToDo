import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TodoList from '../components/TodoList';
import ImageContainer from '../components/ImageContainer';
import { isTokenValid, logout } from '../Utils/auth';
import UserProfile from './UserProfile';
import { VStack } from '@chakra-ui/react';

function Todos() {
  const navigate = useNavigate();



  useEffect(() => {
    const token = localStorage.getItem('token');

    if ( !isTokenValid(token)) {
      navigate('/login');
    }
  }, [navigate]);

 
  return (
    <VStack w='100%' padding='20px'>
    

      <UserProfile/>
      <ImageContainer/>
      <TodoList />
    </VStack>
  );
}

export default Todos;
