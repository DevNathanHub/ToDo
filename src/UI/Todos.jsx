import { Box, HStack } from '@chakra-ui/react'
import React from 'react'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'


function Todos() {
  return (
    <Box>
        <HStack ><AddTodo/></HStack>
        <HStack><TodoList/></HStack>
    </Box>
  )
}

export default Todos