import React, { useEffect, useState } from 'react';
import { Heading, VStack, Text, IconButton, HStack, TagLeftIcon, TagLabel, Tag, TagRightIcon, Button, Icon, CardBody, CardFooter, Card, Divider, Box } from '@chakra-ui/react';
import { useTodos } from '../context/TodosContext';
import { FaTrash, FaPen } from 'react-icons/fa6';
import axios from 'axios';
import useAuthConfig from '../Auth/AuthConfig';
import UpdateTodo from './UpdateTodo';
import AddTodo from './AddTodo';
import { format, formatDistanceToNow, isToday, isYesterday } from 'date-fns';

const TodoList = () => {
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
  }, [config]);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/todos/${id}`, config);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo._id !== id));
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  const handleEdit = async (id, updatedTodo) => {
    return <UpdateTodo id={id} updatedTodo={updatedTodo}/>;
  };

  const formatDate = (date) => {
    const parsedDate = new Date(date);
  
    if (isToday(parsedDate)) {
      return format(parsedDate, 'hh:mm a');
    } else if (isYesterday(parsedDate)) {
      return `${format(parsedDate, 'hh:mm a')} 1d Ago`;
    } else {
      const daysAgo = formatDistanceToNow(parsedDate, { addSuffix: true });
      return `${format(parsedDate, 'hh:mm a')} ${daysAgo}`;
    }
  };

  return (
    <VStack>
      <HStack gap={6} align="start" justifyContent='space-between'   w='100%' px={2}>

         <Heading>TodoList</Heading>
         <AddTodo/>
      </HStack>
     
      {todos && todos.length > 0 ? (
        todos.map((todo) => (
        
            <VStack  key={todo._id} align="start" borderWidth="1px" p="4" borderRadius="20px" w="100%">
              <HStack  align="start" justifyContent='space-between' w="100%">
                <HStack gap={4}>
                    <Tag colorScheme={todo.completed ? 'green' : 'red'} variant={todo.completed ? 'solid' : 'outline'} cursor='none'>
                  {todo.completed ? 'Done' : 'NotYet'}
                </Tag>

            
                <Heading size="md">{todo.title}</Heading>
              </HStack>
              
            <HStack>
              <IconButton
                  onClick={() => handleEdit(todo._id, todo)}
                  colorScheme='teal'
                  aria-label='Update'
                  icon={<FaPen />}
                  size='sm'
                  variant='ghost'
                />
              <IconButton
                onClick={() => handleDelete(todo._id)}
                colorScheme='red'
                aria-label='Delete'
                icon={<FaTrash />}
                size='sm'
                variant='ghost'
              />
            </HStack>
              
            </HStack>
           <HStack>
           <Text>{todo.description}</Text>
           

         </HStack>
         <HStack width='100%'>
          
          <Tag fontSize='xs' w='120px' variant='ghost' > {formatDate(todo.createdAt)}</Tag>
          <Divider/>
          {todo && todo.createdAt !== todo.updatedAt ? (
            <Tag fontSize='xs' w='200px'>
              <TagLeftIcon as={FaPen} /> {formatDate(todo.updatedAt)}
            </Tag>
          ) : (
            null
          )}
         </HStack>
         </VStack>
       
        ))
      ) : (
        <Text>No todos found.</Text>
      )}
    </VStack>
  );
};

export default TodoList;
