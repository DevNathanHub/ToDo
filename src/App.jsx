import { Text, Heading, VStack } from '@chakra-ui/react'
import React from 'react'
import ButtonComponent from './assets/components/ButtonComponent'

function App() {
  return (
    <VStack>
      <Text>Welcome to</Text>
      <Heading>Task-Buddy</Heading>
     <ButtonComponent/>
    </VStack>
  )
}

export default App