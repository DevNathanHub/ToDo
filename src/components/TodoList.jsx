import React, { useEffect, useState } from 'react';
import { Heading, VStack, Text, IconButton, HStack } from '@chakra-ui/react';
import { useTodos } from '../context/TodosContext';
import { FaDeleteLeft, FaPen } from 'react-icons/fa6';
import deleteTodo from './DeleteTodo';
import updateTodo from './UpdateTodo';
import axios from 'axios';
import useAuthConfig from '../Auth/AuthConfig';

function TodoList() {
  const [todos, setTodos] = useState([]);
  const config = useAuthConfig();
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/todos', config);
        setTodos(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleDelete = (id) => {
    deleteTodo(id);
  };

  const handleEdit = (id, todo) => {
    updateTodo({ id, todo });
  };

  return (
    <VStack>
      <Heading>TodoList</Heading>
      {todos && todos.length > 0 ? (
        todos.map((todo, index) => (
          <HStack key={todo._id} align="start" borderWidth="1px" p="4" borderRadius="20px" w="100%">
            <input type="radio" checked={todo.completed} readOnly />
            <VStack ml={4}>
              <Heading size="md">{todo.title}</Heading>
              <Text>{todo.description}</Text>
            </VStack>
          
            <IconButton
              icon={<FaPen />}
              aria-label="Edit todo"
              onClick={() => handleEdit(todo._id, todo)}
              colorScheme="teal"
              variant="outline"
            />
            <IconButton
              icon={<FaDeleteLeft />}
              aria-label="Delete todo"
              onClick={() => handleDelete(todo._id)}
              colorScheme="red"
              variant="outline"
            />
          </HStack>
        ))
      ) : (
        <Text>No todos found.</Text>
      )}
    </VStack>
  );
}

export default TodoList;