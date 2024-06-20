import { Text, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import ButtonComponent from './components/ButtonComponent'
import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate();
 
  return (
    <VStack>
      <Text>Welcome to</Text>
      <Heading>Task-Buddy</Heading>
     <ButtonComponent onClick={() => { navigate('/signup')}}>Get Started</ButtonComponent>
    </VStack>
  )
}

export default Home