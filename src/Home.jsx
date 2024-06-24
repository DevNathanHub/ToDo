import { Text, Heading, VStack, Box, HStack } from '@chakra-ui/react'
import React from 'react'
import ButtonComponent from './components/ButtonComponent'
import { useNavigate } from 'react-router-dom'
import ImageContainer from './components/ImageContainer';
import About from './UI/About';

function Home() {
  const navigate = useNavigate();
 
  return (
    <Box w='100%'>
    <VStack w='100%' >
      <Box display='flex' flexDirection='column' alignItems='start' w='100%' >
         <Text>Welcome to</Text>
      </Box>
      <Box display='flex' flexDirection='column' alignItems='start' w='100%' mb={8}>
         <Heading>Task-Buddy</Heading>
      </Box>
      <Box w='100%'>
        <ImageContainer/>
      </Box>
      
      <Box w='100%'>
        <About/>
      </Box>
      <Box w='100%'>
        <ButtonComponent onClick={() => { navigate('/signup')}}>Get Started</ButtonComponent>
      </Box>
    </VStack>
    </Box>
  )
}

export default Home